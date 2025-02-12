export type TaskPointer = string
export type EndPointer = null

export type CatchDefinition = {
  [key: string]: {
    then: TaskPointer | EndPointer
  }
}

export type ActivityContext = Record<string, unknown>

export type ActivityFunction<
  I = unknown,
  O = unknown,
  C extends ActivityContext = {}
> = (input: I, context: C) => Promise<O>

export type ActivityDefinition<I = unknown, O = unknown> = {
  type: 'activity'
  name: string
  fn: ActivityFunction<I, O>
  then: TaskPointer | EndPointer
  catch?: CatchDefinition
}

export type CatchInput<Key extends string> = {
  key: Key
  error: unknown
}

export type ChoiceDefinition<I = unknown, O = unknown> = {
  type: 'choice'
  name: string
  fn: ActivityFunction<I, O>
  choices: {
    [key: string]: TaskPointer | EndPointer
  }
}

export type TaskDefinition<I = unknown, O = unknown> =
  | ActivityDefinition<I, O>
  | ChoiceDefinition<I, O>

export type TaskDefinitions = TaskDefinition[]

export type Transition = {
  transitionName: string
  from: TaskDefinition | null
  to: TaskDefinition | null
  nextInput: unknown
}

export type WorkflowResult = {
  success: boolean
  transitions: Transition[]
  output: unknown
  context: unknown
}
