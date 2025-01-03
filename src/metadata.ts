/* eslint-disable */
export default async () => {
  const t = {
    ['./users/entities/user.entity']: await import('./users/entities/user.entity'),
    ['./transaction-records/enums/transaction-type.enum']: await import(
      './transaction-records/enums/transaction-type.enum'
    ),
    ['./categories/entities/category.entity']: await import('./categories/entities/category.entity'),
    ['./transaction-records/entities/transaction-record.entity']: await import(
      './transaction-records/entities/transaction-record.entity'
    ),
  };
  return {
    '@nestjs/swagger': {
      models: [
        [
          import('./categories/entities/category.entity'),
          {
            Category: {
              id: { required: true, type: () => String },
              title: { required: true, type: () => String },
              createdBy: { required: true, type: () => t['./users/entities/user.entity'].User },
              createdByUserID: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./transaction-records/entities/transaction-record.entity'),
          {
            TransactionRecord: {
              id: { required: true, type: () => String },
              amount: { required: true, type: () => Number },
              type: { required: true, enum: t['./transaction-records/enums/transaction-type.enum'].ETrancactionType },
              title: { required: true, type: () => String },
              desctiption: { required: false, type: () => String },
              date: { required: true, type: () => String },
              createdBy: { required: true, type: () => t['./users/entities/user.entity'].User },
              createdByUserID: { required: true, type: () => String },
              category: { required: true, type: () => t['./categories/entities/category.entity'].Category },
              categoryId: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./users/entities/user.entity'),
          {
            User: {
              id: { required: true, type: () => String },
              username: { required: true, type: () => String },
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
              categories: { required: true, type: () => [t['./categories/entities/category.entity'].Category] },
              transactions: {
                required: true,
                type: () => [t['./transaction-records/entities/transaction-record.entity'].TransactionRecord],
              },
            },
          },
        ],
        [
          import('./users/dto/create-user.dto'),
          {
            CreateUserDto: {
              username: { required: true, type: () => String },
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
            },
          },
        ],
        [import('./users/dto/update-user.dto'), { UpdateUserDto: {} }],
        [
          import('./categories/dto/create-category.dto'),
          { CreateCategoryDto: { title: { required: true, type: () => String } } },
        ],
        [import('./categories/dto/update-category.dto'), { UpdateCategoryDto: {} }],
        [
          import('./transaction-records/dto/create-transaction-record.dto'),
          {
            CreateTransactionRecordDto: {
              amount: { required: true, type: () => Number },
              type: { required: true, enum: t['./transaction-records/enums/transaction-type.enum'].ETrancactionType },
              title: { required: true, type: () => String },
            },
          },
        ],
        [import('./transaction-records/dto/update-transaction-record.dto'), { UpdateTransactionRecordDto: {} }],
      ],
      controllers: [
        [
          import('./users/users.controller'),
          {
            UsersController: {
              create: { type: Object },
              findAll: { type: [t['./users/entities/user.entity'].User] },
              findOne: { type: t['./users/entities/user.entity'].User },
              update: {},
              remove: {},
            },
          },
        ],
        [
          import('./categories/categories.controller'),
          {
            CategoriesController: {
              create: { type: Object },
              findAll: { type: [t['./categories/entities/category.entity'].Category] },
              findOne: { type: t['./categories/entities/category.entity'].Category },
              update: {},
              remove: {},
            },
          },
        ],
        [
          import('./transaction-records/transaction-records.controller'),
          {
            TransactionRecordsController: {
              create: { type: Object },
              findAll: { type: [t['./transaction-records/entities/transaction-record.entity'].TransactionRecord] },
              findOne: { type: t['./transaction-records/entities/transaction-record.entity'].TransactionRecord },
              update: {},
              remove: {},
            },
          },
        ],
        [import('./auth/auth.controller'), { AuthController: { login: { type: Object }, register: { type: Object } } }],
      ],
    },
  };
};
