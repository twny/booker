{ pkgs ? import <nixpkgs> {}
, buildNodeJs ? pkgs.callPackage <nixpkgs/pkgs/development/web/nodejs/nodejs.nix> { python = pkgs.python3; }
}: let
  nodejsVersion = pkgs.lib.fileContents ./.nvmrc;

  nodejs = buildNodeJs {
    enableNpm = false;
    version = nodejsVersion;
    sha256 = "sha256-Q5xxqi84woYWV7+lOOmRkaVxJYBmy/1FSFhgScgTQZA=";
  };

  NPM_CONFIG_PREFIX = toString ./npm_config_prefix;
in pkgs.mkShell {
  packages = [
    nodejs
    pkgs.yarn
  ];

  inherit NPM_CONFIG_PREFIX;

  shellHook = ''
    export PATH="${NPM_CONFIG_PREFIX}/bin:$PATH"
  '';
}
