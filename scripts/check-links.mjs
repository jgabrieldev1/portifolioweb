import { access, readFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { glob } from "node:fs/promises";

const root = process.cwd();
const htmlFiles = [];

for await (const file of glob("**/*.html", { cwd: root, exclude: ["node_modules/**"] })) {
  htmlFiles.push(file);
}

const errors = [];

for (const file of htmlFiles) {
  const absoluteFile = resolve(root, file);
  const html = await readFile(absoluteFile, "utf8");
  const ids = new Set([...html.matchAll(/\sid=["']([^"']+)["']/gi)].map((match) => match[1]));
  const references = [...html.matchAll(/\s(?:href|src)=["']([^"']+)["']/gi)].map((match) => match[1]);

  for (const reference of references) {
    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(reference)) continue;

    const [pathWithQuery, fragment] = reference.split("#", 2);
    const pathname = pathWithQuery.split("?", 1)[0];
    const targetFile = pathname ? resolve(dirname(absoluteFile), decodeURIComponent(pathname)) : absoluteFile;

    try {
      await access(targetFile);
    } catch {
      errors.push(`${file}: destino inexistente: ${reference}`);
      continue;
    }

    if (fragment) {
      const targetHtml = targetFile === absoluteFile ? html : await readFile(targetFile, "utf8");
      const targetIds =
        targetFile === absoluteFile
          ? ids
          : new Set([...targetHtml.matchAll(/\sid=["']([^"']+)["']/gi)].map((match) => match[1]));

      if (!targetIds.has(decodeURIComponent(fragment))) {
        errors.push(`${file}: ancora inexistente: ${reference}`);
      }
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`${htmlFiles.length} arquivos HTML verificados sem links internos quebrados.`);
}
