import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { Expense, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IExpenseFilters } from './expense.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { expenseSearchableFields } from './expense.constant';

// create
const create = async (data: Expense): Promise<Expense | null> => {
  const findHead = await prisma.accountHead.findFirst({
    where: { label: 'Miscellaneous Expense' },
  });

  if (!findHead) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'First setup your account');
  }
  data.accountHeadId = findHead.id;

  data.isMisc = true;
  const result = await prisma.expense.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create');
  }

  return result;
};

// get all
const getAll = async (
  filters: IExpenseFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Expense[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: expenseSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.entries(filterData).map(([field, value]) => ({
        [field]: value === 'true' ? true : value === 'false' ? false : value,
      })),
    });
  }

  const whereConditions: Prisma.ExpenseWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.expense.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    include: {
      vehicle: true,
      expenseHead: true,
    },
  });

  const total = await prisma.expense.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

// get single
const getSingle = async (id: string): Promise<Expense | null> => {
  const result = await prisma.expense.findUnique({
    where: {
      id,
    },
    include: {
      vehicle: true,
      expenseHead: true,
    },
  });

  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<Expense>
): Promise<Expense | null> => {
  // check is exist
  const isExist = await prisma.expense.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Expense Not Found');
  }

  const result = await prisma.expense.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Expense');
  }

  return result;
};

// delete
const deleteSingle = async (id: string): Promise<Expense | null> => {
  // check is exist
  const isExist = await prisma.expense.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Expense Not Found');
  }

  const result = await prisma.expense.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ExpenseService = {
  create,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};
