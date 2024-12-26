import { atomWithStorage } from 'jotai/utils'
import { AUTH } from '~/types/auth'

const tokenAtom = atomWithStorage<string | undefined>('token', 'undefined')
const userInfoAtom = atomWithStorage<AUTH.AuthState | undefined>('info', undefined)
const permissionsAtom = atomWithStorage<Array<string>>('permissions', [
  'home',
  'system',
  'system:user',
  'profile',
  'system:role',
  'system:tenant',
  'system:log'
])

export { tokenAtom, userInfoAtom, permissionsAtom }
