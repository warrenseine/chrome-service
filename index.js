const spawn = require('child_process').spawn
const express = require('express')
const path = require('path')
const fs = require('fs')
const url = require('url')

let bin = process.env.CHROME_BIN || 'google-chrome'

const tmpDir = 'tmp'

fs.mkdir(tmpDir, () => {})

let app = express()

app.get('/', function (req, res) {
  let target = url.parse(req.query.url)
  let tmpFileName = `screenshot${Math.floor(Math.random() * 10000)}.png`
  let tmpFilePath = path.join(__dirname, tmpDir, tmpFileName)
  let args = [
    '--headless',
    '--disable-gpu',
    '--window-size=640x480',
    '--hide-scrollbars',
    '--screenshot=' + tmpFilePath,
    target.href
  ]
  console.log('Querying:', req.query.url)
  console.log('Running:', bin, args)
  let proc = spawn(bin, args)
  proc.stdout.on('data', b => console.log(b.toString()))
  proc.stderr.on('data', b => console.error(b.toString()))
  proc.on('close', error => {
    if (error) {
      console.error('Failed:', error)
      return res.sendStatus(400)
    }
    console.log('Responding:', tmpFilePath)
    return res.sendFile(tmpFilePath, error => {
      if (error) {
        console.error('Failed:', error)
        res.sendStatus(400)
      }

      fs.unlink(tmpFilePath, (error) => {})
    })
  })
})

app.listen(3000)
