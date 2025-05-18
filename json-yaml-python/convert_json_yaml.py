import json
import yaml
import sys
import os

def json_to_yaml(json_file, yaml_file):
    with open(json_file, 'r', encoding='utf-8') as jf:
        data = json.load(jf)
    with open(yaml_file, 'w', encoding='utf-8') as yf:
        yaml.dump(data, yf, allow_unicode=True, sort_keys=False)
    print(f"✅ Converted JSON → YAML: {yaml_file}")

def yaml_to_json(yaml_file, json_file):
    with open(yaml_file, 'r', encoding='utf-8') as yf:
        data = yaml.safe_load(yf)
    with open(json_file, 'w', encoding='utf-8') as jf:
        json.dump(data, jf, indent=2, ensure_ascii=False)
    print(f"✅ Converted YAML → JSON: {json_file}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage:\n  python convert_json_yaml.py input.json output.yaml\n  or\n  python convert_json_yaml.py input.yaml output.json")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    ext_in = os.path.splitext(input_file)[1].lower()
    ext_out = os.path.splitext(output_file)[1].lower()

    if ext_in == ".json" and ext_out in [".yaml", ".yml"]:
        json_to_yaml(input_file, output_file)
    elif ext_in in [".yaml", ".yml"] and ext_out == ".json":
        yaml_to_json(input_file, output_file)
    else:
        print("❌ Invalid file extensions. Use .json → .yaml or .yaml → .json")
