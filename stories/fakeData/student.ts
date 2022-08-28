import { faker } from '@faker-js/faker'

const range = (num: number): number[] => {
  let res: number[] = []
  for (let i = 1; i <= num; i++) {
    res.push(i)
  }
  return res
}

export const randomPerson = (total: number = 5) => {
  return range(total).map(i => ({
    id: i,
    name: faker.name.findName(),
    phone: faker.phone.number('1## #### ####'),
    age: faker.datatype.number({ min: 0, max: 20 }),
    married: i % 2 === 1,
    address: faker.address.county(),
  }))
}

export const randomStudents = (total: number = 5): Student[] => {
  return range(total).map(i => ({
    id: i,
    name: faker.name.findName(),
    age: faker.datatype.number({ min: 0, max: 20 }),
    phone: faker.phone.number('1## #### ####'),
    gender: i % 3,
    province: faker.address.county(),
    city: faker.address.cityName(),
    fatherName:  faker.name.findName(),
    fatherAge: faker.datatype.number({ min: 20, max: 100 }),
    motherName:  faker.name.findName(),
    motherAge: faker.datatype.number({ min: 20, max: 100 }),
    desc: faker.commerce.productDescription()
  }))
}

export interface Student {
  id: number
  name: string
  age: number
  gender: number
  phone: string
  province: string
  city: string
  fatherName: string
  fatherAge: number
  motherName: string
  motherAge: number
  desc?: string
}