export default async function initCommand() {
  await copyFile(`${__dirname}/../templates/bare-v0.json`, configFilePath);
  console.log(
    `Initialized a new Morando project with configuration file: ${configFilePath}`
  );
}
