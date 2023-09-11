import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body;

    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    res.status(200).json({
      sucess: true,
      data: result,
      massage: 'AcademicSemester create  sucessfully',
    });
  } catch (err) {
    // res.status(400).json({
    //   sucess: false,
    //   massage: 'Faile to create User',
    // });

    next(err);
  }
};

export const AcademicSemesterController = {
  createSemester,
};
