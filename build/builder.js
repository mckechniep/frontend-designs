(function () {
  'use strict';

  const form = document.querySelector('[data-builder-form]');
  const supportRoot = document.querySelector('[data-support-status]');
  const artifactRoot = document.querySelector('[data-artifact-output]');
  const briefRoot = document.querySelector('[data-build-brief]');
  const promptRoot = document.querySelector('[data-prompt-draft]');
  const copyJsonButton = document.querySelector('[data-copy-json]');
  const copyPromptButton = document.querySelector('[data-copy-prompt]');
  const resolveSitePath =
    window.FramekitPaths && typeof window.FramekitPaths.resolveSitePath === 'function'
      ? window.FramekitPaths.resolveSitePath
      : function (path) {
          return path;
        };

  const genericTemplateArtifacts = new Set([
    '/templates/react/Page.tsx',
    '/templates/react/Component.tsx',
    '/templates/next/app-page.tsx',
    '/templates/next/layout.tsx'
  ]);

  function populateSelect(select, values) {
    if (!select) return;
    select.innerHTML = values
      .map((value) => {
        const label =
          value === 'app-screen'
            ? 'app-screen'
            : value === 'component-demo'
              ? 'component-demo'
              : value;
        return `<option value="${value}">${label}</option>`;
      })
      .join('');
  }

  function copyText(text) {
    if (!navigator.clipboard) return Promise.reject(new Error('clipboard unavailable'));
    return navigator.clipboard.writeText(text);
  }

  function surfaceLabel(surfaceId) {
    return surfaceId === 'app-screen' ? 'app screen' : surfaceId;
  }

  function preferredStylingForTarget(targetId) {
    return targetId === 'vanilla' ? 'css' : 'tailwind';
  }

  function artifactLinkLabel(path) {
    if (!path) return 'Open artifact';
    if (/\/design\/examples\//.test(path)) return 'Read design reference';
    if (/\/themes\//.test(path) && /\.html$/.test(path)) return 'Open live runtime';
    if (/\/templates\//.test(path)) {
      return genericTemplateArtifacts.has(path) ? 'Open starter template source' : 'Open anchor template source';
    }
    return 'Open artifact';
  }

  function artifactTypeLabel(path) {
    if (!path) return 'No direct source registered';
    if (/\/design\/examples\//.test(path)) return 'Design reference';
    if (/\/themes\//.test(path) && /\.html$/.test(path)) return 'Live runtime';
    if (/\/templates\//.test(path)) {
      return genericTemplateArtifacts.has(path) ? 'Generic starter source' : 'Profile-specific source anchor';
    }
    return 'Artifact';
  }

  Promise.all([
    fetch('../shared/build-brief.contract.json').then((response) => {
      if (!response.ok) throw new Error('build brief contract request failed');
      return response.json();
    }),
    fetch('../shared/surface-coverage.json').then((response) => {
      if (!response.ok) throw new Error('surface coverage request failed');
      return response.json();
    })
  ])
    .then(([contract, coverage]) => {
      const profileSelect = form.querySelector('[data-field="profile_id"]');
      const surfaceSelect = form.querySelector('[data-field="surface_archetype"]');
      const outputSelect = form.querySelector('[data-field="output_target"]');
      const stylingSelect = form.querySelector('[data-field="styling_system"]');
      const themeSelect = form.querySelector('[data-field="theme_mode"]');
      const intensitySelect = form.querySelector('[data-field="expressive_intensity"]');
      const componentModeSelect = form.querySelector('[data-field="component_scope_mode"]');
      const requestedComponentsInput = form.querySelector('[data-field="requested_components"]');

      populateSelect(profileSelect, contract.properties.profile_id.enum);
      populateSelect(
        surfaceSelect,
        contract.properties.surface_archetype.enum.filter((value) => value !== 'component-demo' && value !== 'mixed-other')
      );
      populateSelect(outputSelect, contract.properties.output_target.enum);
      populateSelect(stylingSelect, contract.properties.styling_system.enum);
      populateSelect(themeSelect, contract.properties.theme_mode.enum);
      populateSelect(intensitySelect, contract.properties.expressive_intensity.enum);
      populateSelect(componentModeSelect, contract.properties.component_scope.properties.mode.enum);

      surfaceSelect.value = contract.defaults.surface_archetype;
      outputSelect.value = contract.defaults.output_target;
      stylingSelect.value = contract.defaults.styling_system;
      themeSelect.value = contract.defaults.theme_mode;
      intensitySelect.value = contract.defaults.expressive_intensity;
      componentModeSelect.value = contract.defaults.component_scope.mode;

      function lookupProfile(profileId) {
        return coverage.profiles.find((profile) => profile.id === profileId);
      }

      function getSupportClass(status) {
        if (status === 'canonical') return 'support-badge support-badge--canonical';
        if (status === 'preview') return 'support-badge support-badge--preview';
        if (status === 'needs-review') return 'support-badge support-badge--needs-review';
        return 'support-badge support-badge--unsupported';
      }

      function getSupportLabel(status) {
        if (status === 'needs-review') return 'needs review';
        return status;
      }

      function renderNotes(notes) {
        if (!notes.length) return '';
        return `
          <ul class="builder-note-list">
            ${notes.map((note) => `<li>${note}</li>`).join('')}
          </ul>
        `;
      }

      function getCoverageAssessment(brief, profile, support) {
        const notes = [];
        const preferredStyling = preferredStylingForTarget(brief.output_target);

        if (brief.styling_system !== preferredStyling) {
          notes.push(
            `${brief.output_target} currently ships with ${preferredStyling}, so ${brief.styling_system} is stored in the brief but not verified by a shipped anchor.`
          );
        }

        if (/^both-toggle/.test(brief.theme_mode)) {
          notes.push('Theme toggles are not shipped on the public Framekit surfaces; treat this as a brief preference, not a verified runtime.');
        } else if (brief.theme_mode !== profile.defaultTheme) {
          notes.push(
            `${profile.label} currently ships in ${profile.defaultTheme} mode, so ${brief.theme_mode} is a brief choice rather than a verified public surface.`
          );
        }

        if (support.artifact && genericTemplateArtifacts.has(support.artifact)) {
          notes.push('The recommended source file is a generic starter template, not a profile-specific anchor.');
        }

        const effectiveStatus =
          support.status === 'unsupported'
            ? 'unsupported'
            : notes.length
              ? 'needs-review'
              : support.status;

        return { effectiveStatus, notes };
      }

      function buildPrompt(brief, assessment) {
        const requested = brief.component_scope.requested_components.length
          ? ` Include these components if relevant: ${brief.component_scope.requested_components.join(', ')}.`
          : '';

        let supportNote = 'This combination is unsupported, so route to the nearest shipped runtime first.';
        if (assessment.effectiveStatus === 'canonical') {
          supportNote = 'Use the shipped runtime and design reference as the primary source of truth.';
        } else if (assessment.effectiveStatus === 'preview') {
          supportNote = 'Use the preview anchor source plus the live runtime as the visual source of truth.';
        } else if (assessment.effectiveStatus === 'needs-review') {
          supportNote = 'Start from the closest shipped anchor and treat the unmatched brief selections as manual follow-up work.';
        }

        return [
          'Use $kickass-frontend.',
          `Build a ${surfaceLabel(brief.surface_archetype)} surface in ${brief.output_target} with ${brief.styling_system}.`,
          `Profile: ${brief.profile_id}. Theme mode: ${brief.theme_mode}. Intensity: ${brief.expressive_intensity}.`,
          `Component scope: ${brief.component_scope.mode}.${requested}`,
          supportNote
        ].join(' ');
      }

      function render() {
        const profile = lookupProfile(profileSelect.value);
        if (!profile) return;

        const surface = profile.surfaces[surfaceSelect.value];
        if (!surface) return;

        const support = surface.targets[outputSelect.value] || { status: 'unsupported' };
        const requestedComponents = requestedComponentsInput.value
          .split(',')
          .map((value) => value.trim())
          .filter(Boolean);

        const brief = {
          profile_id: profile.id,
          surface_archetype: surfaceSelect.value,
          output_target: outputSelect.value,
          styling_system: stylingSelect.value,
          theme_mode: themeSelect.value,
          expressive_intensity: intensitySelect.value,
          component_scope: {
            mode: componentModeSelect.value,
            requested_components: requestedComponents
          }
        };

        const assessment = getCoverageAssessment(brief, profile, support);
        const fallbackTarget =
          Object.entries(surface.targets).find(([, target]) => target.status === 'canonical')
          || Object.entries(surface.targets).find(([, target]) => target.status === 'preview');

        let coverageSummary = 'There is no shipped anchor for this stack and surface pair yet.';
        if (assessment.effectiveStatus === 'canonical') {
          coverageSummary = 'This stack and surface pair has a shipped canonical anchor in the current repo.';
        } else if (assessment.effectiveStatus === 'preview') {
          coverageSummary = 'A stack-specific preview anchor exists, but it is not yet a canonical public runtime.';
        } else if (assessment.effectiveStatus === 'needs-review') {
          coverageSummary = 'A shipped anchor exists, but part of this brief falls outside the currently verified runtime and source set.';
        }

        supportRoot.innerHTML = `
          <span class="${getSupportClass(assessment.effectiveStatus)}">${getSupportLabel(assessment.effectiveStatus)}</span>
          <p>${profile.label} / ${surfaceLabel(surfaceSelect.value)} / ${outputSelect.value}</p>
          <p>${coverageSummary}</p>
          ${renderNotes(assessment.notes)}
        `;

        const links = [];
        const seenLinks = new Set();

        function pushLink(href, label) {
          if (!href) return;
          const key = `${href}::${label}`;
          if (seenLinks.has(key)) return;
          seenLinks.add(key);
          links.push(`<a href="${href}">${label}</a>`);
        }

        pushLink(resolveSitePath(surface.liveRuntime), 'Open live runtime');
        pushLink(resolveSitePath(support.artifact), artifactLinkLabel(support.artifact));
        pushLink(resolveSitePath(surface.designExample), 'Read design reference');

        if (support.status === 'unsupported' && fallbackTarget && fallbackTarget[1].artifact) {
          pushLink(resolveSitePath(fallbackTarget[1].artifact), `Open nearest shipped ${fallbackTarget[0]} source`);
        }

        let artifactMeta = 'No direct source is registered for this selection yet.';
        if (support.status === 'unsupported' && fallbackTarget) {
          artifactMeta = `No direct ${brief.output_target} anchor exists yet. Nearest shipped fallback: ${fallbackTarget[0]}.`;
        } else if (support.artifact) {
          artifactMeta = `${artifactTypeLabel(support.artifact)} for ${brief.output_target}.`;
        }

        artifactRoot.innerHTML = `
          <h3>${profile.label} / ${surfaceLabel(surfaceSelect.value)}</h3>
          <p>${profile.descriptor}</p>
          <p class="builder-artifact__meta">${artifactMeta}</p>
          <div class="artifact-links">${links.join('')}</div>
        `;

        const promptDraft = buildPrompt(brief, assessment);
        briefRoot.textContent = JSON.stringify(brief, null, 2);
        promptRoot.textContent = promptDraft;

        copyJsonButton.onclick = function () {
          copyText(briefRoot.textContent).catch(() => {});
        };

        copyPromptButton.onclick = function () {
          copyText(promptRoot.textContent).catch(() => {});
        };
      }

      form.addEventListener('input', render);
      form.addEventListener('change', render);
      render();
    })
    .catch((error) => {
      if (supportRoot) supportRoot.textContent = `Builder data unavailable: ${error.message}`;
      if (artifactRoot) artifactRoot.textContent = 'Unable to recommend sources without the shared registry.';
    });
})();
