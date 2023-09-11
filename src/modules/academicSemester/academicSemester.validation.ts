// req-validation
// body ==> object;

import { z } from 'zod';
import {
  AcademicSemesterCode,
  AcademicSemesterTitle,
  academicSemesterMonths,
} from './academicSemester.constant';

//data==> boject;
const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...AcademicSemesterTitle] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.number({
      required_error: 'Year is required ',
    }),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),

    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'StartMonth is requireed',
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'EndMonth is requireed',
    }),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
