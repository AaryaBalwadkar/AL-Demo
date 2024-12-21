import express, { Request, Response, RequestHandler, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../assets/certificates')); 
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const uploadHandler: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return; 
    }

    const uniqueId = Date.now();
    const certificateURL = `${req.protocol}://${req.get('host')}/certificates/${req.file.filename}`;

    res.status(200).json({
      message: 'Certificate uploaded successfully',
      uniqueId,
      url: certificateURL,
    });

    return; 
  } catch (error) {
    next(error);
  }
};

router.post('/upload', upload.single('certificate'), uploadHandler);

const fetchHandler: RequestHandler = (req: Request, res: Response) => {
  const filePath = path.join(__dirname, '../../assets/certificates', req.params.filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: 'Certificate not found' });
    }
  });
};

router.get('/:filename', fetchHandler);

export default router;
