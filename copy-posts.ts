import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src/lib/blog');
const destDir = path.join(__dirname, 'static/raw-blog');

console.log(`Copying blog posts from ${srcDir} to ${destDir}...`);

try {
  // Ensure the destination directory exists (though cpSync with recursive: true handles subdirectories, the root dest might need existence or it creates it if it doesn't exist depending on behavior, but cpSync generally handles the copy correctly. Let's rely on cpSync behavior or ensure parent.)
  // Actually, cpSync copies the *source* to the *dest*. If dest exists, it copies content into it if it's a dir? No, cpSync behaves like `cp -r`.

  // Let's use fs.cpSync directly.
  fs.cpSync(srcDir, destDir, { recursive: true, force: true });
  console.log('Successfully copied blog posts.');
} catch (err) {
  console.error('Error copying blog posts:', err);
  process.exit(1);
}
