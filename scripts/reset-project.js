#!/usr/bin/env node

/**
 * This script is used to reset the project to a blank state.
 * It moves the /app directory to /app-example and creates a new /app directory with an index.tsx and _layout.tsx file.
 * You can remove the `reset-project` script from package.json and safely delete this file after running it.
 */

const fs = require('fs');
const path = require('path');
const Logger = require('../infrastructure/logger/Logger');

const root = process.cwd();
const oldDirPath = path.join(root, 'app');
const newDirPath = path.join(root, 'app-example');
const newAppDirPath = path.join(root, 'app');

const indexContent = `import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
`;

const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
`;

fs.rename(oldDirPath, newDirPath, (error) => {
  if (error) {
    return Logger.error(`Error renaming directory: ${error}`);
  }
  Logger.info('/app moved to /app-example.');

  fs.mkdir(newAppDirPath, { recursive: true }, (error) => {
    if (error) {
      return Logger.error(`Error creating new app directory: ${error}`);
    }
    Logger.info('New /app directory created.');

    const indexPath = path.join(newAppDirPath, 'index.tsx');
    fs.writeFile(indexPath, indexContent, (error) => {
      if (error) {
        return Logger.error(`Error creating index.tsx: ${error}`);
      }
      Logger.info('app/index.tsx created.');

      const layoutPath = path.join(newAppDirPath, '_layout.tsx');
      fs.writeFile(layoutPath, layoutContent, (error) => {
        if (error) {
          return Logger.error(`Error creating _layout.tsx: ${error}`);
        }
        Logger.info('app/_layout.tsx created.');
      });
    });
  });
});
