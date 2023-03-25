# ORD Resolver Chrome Extension

ORD Resolver is a Chrome extension that handles the custom `ord://` URI protocol. This extension allows users to resolve media files using a custom URI scheme and an Indexer API.

## Installation

Follow these steps to download the extension from the GitHub repository and add it to your Chrome browser:

1. Download the extension files by either cloning the repository or downloading the ZIP archive.
   - Cloning the repository: `git clone https://github.com/your-repository/ord-resolver.git`
   - Downloading the ZIP archive: 
     - Click on the "Code" button on the repository page, then click "Download ZIP". 
     - Extract the contents of the ZIP file to a folder of your choice.
2. Open Google Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner of the page.
4. Click the "Load unpacked" button and navigate to the folder containing the downloaded extension files. Select the folder and click "Open".
5. The ORD Resolver extension should now appear in your list of extensions and its icon should be visible in the Chrome toolbar.

## Usage

Watch the [quick demo video](https://youtu.be/gbanRMcpf1I) to see the extension in action.

To test the extension on your own, open the `example.html` file included in the repository. This file contains media elements with `ord://` URIs, which the extension will resolve using the Indexer API.
