import fs from "fs-extra";
import yaml from "yaml";
import { Command } from "commander";
import chalk from "chalk";
import path from "path";

const program = new Command();

function jsonToYaml(inputPath: string, outputPath: string): void {
  const jsonData = fs.readJsonSync(inputPath);
  const yamlData = yaml.stringify(jsonData);
  fs.writeFileSync(outputPath, yamlData, "utf-8");
  console.log(chalk.green(`✅ Converted JSON → YAML: ${outputPath}`));
}

function yamlToJson(inputPath: string, outputPath: string): void {
  const yamlText = fs.readFileSync(inputPath, "utf-8");
  const jsonData = yaml.parse(yamlText);
  fs.writeJsonSync(outputPath, jsonData, { spaces: 2 });
  console.log(chalk.green(`✅ Converted YAML → JSON: ${outputPath}`));
}

program
  .name("convert-json-yaml")
  .description("Convert between JSON and YAML formats")
  .version("1.0.0")
  .argument("<input>", "Path to input file (.json, .yaml, .yml)")
  .argument("<output>", "Path to output file (.yaml, .yml, .json)")
  .action((input: string, output: string) => {
    const extIn = path.extname(input).toLowerCase();
    const extOut = path.extname(output).toLowerCase();

    if (extIn === ".json" && [".yaml", ".yml"].includes(extOut)) {
      jsonToYaml(input, output);
    } else if ([".yaml", ".yml"].includes(extIn) && extOut === ".json") {
      yamlToJson(input, output);
    } else {
      console.log(chalk.red("❌ Invalid file extension combination."));
      console.log("Usage:");
      console.log("  convert-json-yaml input.json output.yaml");
      console.log("  convert-json-yaml input.yaml output.json");
    }
  });

program.parse();
