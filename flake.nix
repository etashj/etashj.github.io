{
  description = "Dev shell for etashj.github.io (SvelteKit + Vite + Tailwind + Three.js)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_22   # matches @types/node ^22 in package.json
            nodePackages.npm
            git         # needed by svelte-kit sync / some npm lifecycle scripts
          ];

          shellHook = ''
            echo "Node $(node --version) / npm $(npm --version) ready."
            echo ""
            echo "First time setup:"
            echo "  npm install"
            echo ""
            echo "Start dev server:"
            echo "  npm run dev"
            echo ""
            echo "Build for production:"
            echo "  npm run build && npm run preview"
          '';
        };
      });
}
