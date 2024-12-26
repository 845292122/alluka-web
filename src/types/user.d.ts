import { ModalProps } from 'antd'

export namespace USER {
  export type UserDTO = {
    id: number
    tenantId?: number
    roleId?: number
    name?: string
    phone?: string
    password?: string
    status?: number
    delFlag: number
    createdAt: Date
    updatedAt: Date
  }

  export type UserModal = ModalProps

  export type UserTableVO = UserDTO
}
