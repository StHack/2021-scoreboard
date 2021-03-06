import { createHash, randomUUID } from 'crypto'
import { BaseChallenge, Challenge } from 'models/Challenge'
import { Difficulties } from 'models/Difficulty'
import { Schema, model, ToObjectOptions } from 'mongoose'
import { removeMongoProperties } from './main'

const schema = new Schema<Challenge>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String },
  author: { type: String, required: true },
  flag: { type: String, required: true },
  salt: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, enum: Difficulties, required: true },

  isBroken: { type: Boolean, required: true },
  isOpen: { type: Boolean, required: true },
})

const ChallengeModel = model<Challenge>('Challenge', schema)

const flagHasher = (password: string | undefined, salt: string) =>
  password &&
  createHash('sha256')
    .update(password + salt)
    .digest('hex')

const removeProperties: ToObjectOptions = {
  ...removeMongoProperties,
  transform: function (doc, ret, opts) {
    const res = (removeMongoProperties.transform as any)(doc, ret, opts)
    delete res.flag
    delete res.salt
    return res
  },
}

export async function createChallenge(
  chall: BaseChallenge,
): Promise<Challenge> {
  const salt = randomUUID()
  const flag = flagHasher(chall.flag, salt)

  const doc = new ChallengeModel({
    ...chall,
    flag,
    salt,
    isOpen: true,
    isBroken: false,
  })

  const document = await doc.save()
  return document.toObject(removeProperties)
}

export async function listChallenge(): Promise<Challenge[]> {
  const results = await ChallengeModel.find()

  return results.map(r => r.toObject(removeProperties))
}

export async function checkChallenge(
  challName: string,
  flag: string,
): Promise<boolean> {
  const chall = await ChallengeModel.findOne({ name: challName })

  if (!chall) {
    throw new Error('invalid challenge')
  }

  if (chall.isBroken) {
    throw new Error('Chall is broken')
  }

  if (!chall.isOpen) {
    throw new Error('Chall is not open')
  }

  return flagHasher(flag, chall.salt) === chall.flag
}

export async function removeChallenge(challName: string): Promise<void> {
  await ChallengeModel.deleteOne({ name: challName })
}

export async function updateChallenge(
  challName: string,
  { name, flag, ...challenge }: Partial<Challenge>,
): Promise<Challenge> {
  if (flag) {
    const chall = await ChallengeModel.findOne({ name: challName })

    if (!chall)
      throw new Error(
        `Challenge ${challName} can't be updated because it was not found`,
      )

    // @ts-ignore
    challenge.flag = flagHasher(flag, chall.salt)
  }

  const document = await ChallengeModel.findOneAndUpdate(
    { name: challName },
    { ...challenge },
    { new: true },
  )

  if (!document)
    throw new Error(
      `Challenge ${challName} hasn't been updated because it was not found`,
    )

  return document.toObject(removeProperties)
}

export async function closeAllChallenge(): Promise<void> {
  await ChallengeModel.updateMany({}, { isOpen: false })
}

export async function openAllChallenge(): Promise<void> {
  await ChallengeModel.updateMany({}, { isOpen: true })
}
