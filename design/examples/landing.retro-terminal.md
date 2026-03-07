profile: retro-terminal
surface: landing
style_intent: crt-security-console
signature_requirements:
  - boot sequence overlay (POST/kernel/service startup log) before main reveal
  - terminal-frame shell with command prompt chrome
  - hard-edged geometry (cards/badges/buttons/inputs/chips use zero-radius baseline)
  - command-nav labels (`./welcome.sh`, `cat services.conf`, `whoami`, `netstat --threats`, `ssh contact`)
  - hero command output with ASCII logo + typed lines + blinking cursor
  - services rendered as config/listing surface, not generic marketing cards
  - operator profile (`whoami`) block with terminal metadata styling
  - live threat feed with periodic randomized entries + telemetry stat panels
  - keyboard section navigation (`j/k`, arrows, `1-5`) with input-focus safety guard
  - secure transmission feedback sequence on contact submit
  - terminal status footer line (runtime/status/session tone)
  - coherent terminal spacing rhythm (shell padding, command-nav gaps, section cadence, telemetry/form spacing)
