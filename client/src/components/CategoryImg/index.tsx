import { Category } from 'models/Category'
import backdoor from './images/backdoor.png'
import crypto from './images/crypto.png'
import d from './images/default.png'
import forensic from './images/forensics.png'
import game from './images/game.png'
import hardware from './images/hardware.png'
import misc from './images/misc.png'
import network from './images/network.png'
import progra from './images/programmation.png'
import pwn from './images/pwn.png'
import recon from './images/recon.png'
import reverse from './images/reverse.png'
import shellcode from './images/shellcode.png'
import web from './images/web.png'
import { Image } from '@mantine/core'

function categoryToImg (category: Category): string {
  switch (category) {
    case 'backdoor':
      return backdoor
    case 'crypto':
      return crypto
    case 'forensic':
      return forensic
    case 'game':
      return game
    case 'hardware':
      return hardware
    case 'misc':
      return misc
    case 'network':
      return network
    case 'pwn':
      return pwn
    case 'recon':
      return recon
    case 'reverse':
      return reverse
    case 'shellcode':
      return shellcode
    case 'web':
      return web
    case 'progra':
      return progra
    default:
      return d
  }
}

export interface CategoryImgProps {
  category: Category
  maw?: string
}
export function CategoryImg ({ category, maw }: CategoryImgProps) {
  return <Image src={categoryToImg(category)} title={category} maw={maw} />
}
