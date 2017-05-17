Chrome Service
==============

Capture websites with Chrome Headless.

# Getting started

* Under Ubuntu 16.10:

```
sudo apt-get update
wget https://dl.google.com/linux/direct/google-chrome-unstable_current_amd64.deb
sudo dpkg -i google-chrome-unstable_current_amd64.deb
sudo apt-get install -y -f
npm install
npm start
```

# Usage

* Open `http://localhost:3000/?url=http://google.com`.

# Contributing

* `npm run watch` to monitor changes.
