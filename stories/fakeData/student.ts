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
    name: i + 'MockName',
    phone: `1878372721${i}`,
    age: 20 + i,
    married: i % 2 === 1,
    address: i + 'MOCK_ADDRESS',
  }))
}

export const randomStudents = (total: number = 5): Student[] => {
  return range(total).map(i => ({
    id: i,
    name: i + 'MOCK_STUDENT',
    age: 13 + i,
    phone: `1878372731${i}`,
    gender: i % 3,
    province: 'MOCK_PROVINCE',
    city: 'MOCK_CITY',
    fatherName: 'MOCK_FATHER_NAME',
    fatherAge: 32 + i,
    motherName: 'MOCK_MOTHER_NAME',
    motherAge: 30 + i,
    desc: 'MOCK_DESCRIPTION'
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