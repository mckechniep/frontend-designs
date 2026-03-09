(function () {
  "use strict";

  const DEFAULT_THEME_ROOT = "../../../themes";
  const PROFILE_REGISTRY = Object.freeze([
    { id: "arctic-mono", defaultTheme: "dark" },
    { id: "cyberpunk-neon", defaultTheme: "dark" },
    { id: "noire-editorial", defaultTheme: "dark" },
    { id: "corporate-blueprint", defaultTheme: "dark" },
    { id: "modern-saas", defaultTheme: "dark" },
    { id: "pastel-dreamscape", defaultTheme: "light" },
    { id: "retro-terminal", defaultTheme: "dark" },
    { id: "sunset-gradient", defaultTheme: "dark" },
  ]);

  const script = document.currentScript;
  const themeRoot = script?.dataset.themeRoot || DEFAULT_THEME_ROOT;

  const profileStylesheets = Object.freeze(
    PROFILE_REGISTRY.reduce((acc, profile) => {
      acc[profile.id] = `${themeRoot}/${profile.id}/theme.css`;
      return acc;
    }, {})
  );

  const defaultThemes = Object.freeze(
    PROFILE_REGISTRY.reduce((acc, profile) => {
      acc[profile.id] = profile.defaultTheme;
      return acc;
    }, {})
  );

  function normalizeProfile(profileId) {
    if (profileStylesheets[profileId]) return profileId;
    return PROFILE_REGISTRY[0].id;
  }

  function normalizeTheme(theme) {
    return theme === "light" ? "light" : "dark";
  }

  function dispatch(name, detail) {
    document.dispatchEvent(new CustomEvent(name, { detail }));
  }

  function init() {
    const root = document.documentElement;
    const profileLink = document.getElementById("profile-css");
    const profileSelect = document.getElementById("ps");
    const themeSelect = document.getElementById("ts");

    if (!root || !profileLink || !profileSelect || !themeSelect) return;
    if (profileSelect.dataset.previewRuntimeBound === "true") return;

    profileSelect.dataset.previewRuntimeBound = "true";

    function applyTheme(theme) {
      const nextTheme = normalizeTheme(theme);
      root.dataset.theme = nextTheme;
      themeSelect.value = nextTheme;
      dispatch("componentpreview:themechange", {
        profileId: normalizeProfile(root.dataset.profile),
        theme: nextTheme,
      });
    }

    function applyProfile(profileId, options = {}) {
      const normalizedProfile = normalizeProfile(profileId);
      const stylesheet = profileStylesheets[normalizedProfile];
      const nextTheme = normalizeTheme(
        options.preserveTheme
          ? root.dataset.theme || themeSelect.value || defaultThemes[normalizedProfile]
          : defaultThemes[normalizedProfile]
      );

      root.dataset.profile = normalizedProfile;
      root.dataset.theme = nextTheme;
      profileLink.href = stylesheet;
      profileSelect.value = normalizedProfile;
      themeSelect.value = nextTheme;

      dispatch("componentpreview:profilechange", {
        profileId: normalizedProfile,
        theme: nextTheme,
        stylesheet,
      });
    }

    const initialProfile = normalizeProfile(root.dataset.profile || profileSelect.value);
    const initialTheme = normalizeTheme(
      root.dataset.theme || themeSelect.value || defaultThemes[initialProfile]
    );

    profileSelect.value = initialProfile;
    themeSelect.value = initialTheme;
    applyProfile(initialProfile, { preserveTheme: true });

    profileSelect.addEventListener("change", () => {
      applyProfile(profileSelect.value);
    });

    themeSelect.addEventListener("change", () => {
      applyTheme(themeSelect.value);
    });

    window.ComponentPreviewRuntime = {
      applyProfile,
      applyTheme,
      defaultThemes,
      profileStylesheets,
      profiles: PROFILE_REGISTRY,
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
