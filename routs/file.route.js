const { Router } = require("express");
const auth = require('../middleware/auth.middleware');
const File = require('../models/file');

const router = Router();

///api/files/upload
router.post('/upload', auth, async (req, res) => {
  try {
    const { imageBase, description } = req.body
    const owner = req.user

    const file = new File({image:imageBase, owner, description})
    await file.save()

    res.status(201).json({message:"файл загружен на сервак"})

  } catch (e) {
    console.log('upload----',e.message)
    res.status(500).json({ message: 'ошибка при загрузке файла на сервак' })
  }
});

///api/files/show
router.get('/show', auth, async (req, res) => {
  try {
  
    const files = await File.find({owner:req.user})
    res.json(files)

  } catch (e) {
    console.log('upload----',e.message)
    res.status(500).json({ message: 'ошибка при загрузке файлов с сервака' })
  }
});

///api/files/remove
router.post('/remove', auth, async (req, res) => {
  try {
    const { image } = req.body
    const owner = req.user

    const file = await File.find({owner:req.user, image})
    const delFile = new File(file)
    file.forEach(item=>item.remove())

    const files = await File.find({owner:req.user})
    res.json(files) 

  } catch (e) {
    console.log('upload----',e.message)
    res.status(500).json({ message: 'ошибка при удалении' })
  }
});

module.exports = router;
