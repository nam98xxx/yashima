const fs = require("fs");
const path = require("path");
const glob = require("glob");

const twigFiles = glob.sync(
  path.resolve(__dirname, "../src/components/**/*.twig")
);
const regexpFullFileName = /\..*/g;

twigFiles.forEach((twigFile) => {
  const twigFullName = twigFile.replace(regexpFullFileName, "");
  const liquidFile = `${twigFullName}.liquid`;
  if (!fs.existsSync(liquidFile)) {
    fs.rmSync(twigFile);
  }
});
