import * as React from 'react'

type FieldValues = Record<string, string | number>;
type FieldName<FormValues> = keyof FormValues;
type FormState<FormValues> = {
  values: FormValues,
  errors: Record<FieldName<FormValues>, boolean>,
  errorMsgs: Record<FieldName<FormValues>, string>,
  focused: Record<FieldName<FormValues>, boolean>,
  touched: Record<FieldName<FormValues>, boolean>,
  dirty: Record<FieldName<FormValues>, boolean>,
  isValid: boolean,
  isDirty: boolean,
};
type UseFormHTMLElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

export function useForm<FormValues extends FieldValues> (
  defaultValues: FormValues,
  rules?: Partial<
  Record<
  FieldName<FormValues>,
  {
    rules: ((value: string | number) => boolean)[],
    message: string,
  }
  >
  >,
) {
  const _createStateObject = (initObj: FormValues, defaultValue: boolean) => {
    return Object.keys(initObj).reduce(
      (obj, key) => ({
        ...obj,
        [key]: defaultValue,
      }),
      {} as Record<FieldName<FormValues>, boolean>,
    )
  }

  const byErrorMsg = React.useCallback(
    (formRules: typeof rules) => {
      const errorMsgs = {} as Record<FieldName<FormValues>, string>

      if (formRules) {
        (Object.keys(formRules) as (keyof typeof formRules)[]).forEach(
          field => {
            const fieldFormRules = formRules[field]

            if (fieldFormRules) errorMsgs[field] = fieldFormRules.message
          },
        )
      }
      return errorMsgs
    },
    [rules],
  )

  const [defaultValuesState, setDefaultValuesState] = React.useState(
    defaultValues,
  )
  const [formState, setFormState] = React.useState<FormState<FormValues>>({
    values: defaultValues,
    errors: {} as Record<FieldName<FormValues>, boolean>,
    errorMsgs: byErrorMsg(rules),
    focused: _createStateObject(defaultValues, false),
    touched: _createStateObject(defaultValues, false),
    dirty: _createStateObject(defaultValues, false),
    isValid: false,
    isDirty: false,
  })

  const resetForm = React.useCallback(
    (newDefaultValues: FormValues) => {
      setFormState({
        values: newDefaultValues,
        errors: {} as Record<FieldName<FormValues>, boolean>,
        errorMsgs: byErrorMsg(rules),
        focused: _createStateObject(newDefaultValues, false),
        touched: _createStateObject(newDefaultValues, false),
        dirty: _createStateObject(newDefaultValues, false),
        isValid: false,
        isDirty: false,
      })
      setDefaultValuesState(newDefaultValues)
    },
    [byErrorMsg, rules],
  )

  const isFormValid = (errors: Record<FieldName<FormValues>, boolean>) => {
    if (Object.values(errors).includes(true)) return false
    return true
  }

  const isFormDirty = (dirty: Record<FieldName<FormValues>, boolean>) => {
    if (Object.values(dirty).includes(true)) return true
    return false
  }

  const isDirty = (event: React.ChangeEvent<UseFormHTMLElement>) => {
    if (typeof defaultValuesState[event.target.name] === 'number') {
      return (
        parseInt(event.target.value, 10) !==
        defaultValuesState[event.target.name]
      )
    }
    return event.target.value !== defaultValuesState[event.target.name]
  }

  const isError = (
    value: string | number,
    fieldRules?: ((value: string | number) => boolean)[],
  ): boolean => {
    let valid = false
    if (fieldRules) {
      fieldRules.forEach(rule => {
        if (!rule(value)) {
          valid = true
        }
      })
    }
    return valid
  }

  const checkInitialErrors = () => {
    return Object.keys(formState.values).reduce(
      (obj, key) => {
        let error = false

        if (rules) {
          const fieldRules = rules[key]

          if (fieldRules) {
            error = isError(formState.values[key], fieldRules.rules)
          }
        }

        return ({
          ...obj,
          [key]: error,
        })
      },
      {} as Record<FieldName<FormValues>, boolean>,
    )
  }

  React.useEffect(() => {
    setFormState({
      ...formState,
      errors: checkInitialErrors(),
    })
  }, [])

  const validate = (name: FieldName<FormValues>, value: string | number) => {
    if (rules) {
      const fieldRules = rules[name]

      if (fieldRules) {
        setFormState((prevFormState: FormState<FormValues>) => ({
          ...prevFormState,
          errors: {
            ...prevFormState.errors,
            [name]: isError(value, fieldRules.rules),
          },
          isValid: isFormValid({
            ...prevFormState.errors,
            [name]: isError(value, fieldRules.rules),
          }),
        }))
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<UseFormHTMLElement>) => {
    event.persist()

    validate(event.target.name, event.target.value)

    setFormState((prevFormState: FormState<FormValues>) => ({
      ...prevFormState,
      values: {
        ...prevFormState.values,
        [event.target.name]: event.target.value,
      },
      dirty: {
        ...prevFormState.dirty,
        [event.target.name]: isDirty(event),
      },
      isDirty: isFormDirty({
        ...prevFormState.dirty,
        [event.target.name]: isDirty(event),
      }),
    }))
  }

  const handleFocus = (event: React.FocusEvent<UseFormHTMLElement>) => {
    event.persist()

    const touchedField = Object.keys(formState.focused).find(
      key => formState.focused[key] === true,
    )

    setFormState((prevFormState: FormState<FormValues>) => ({
      ...prevFormState,
      focused: {
        ...prevFormState.focused,
        [event.target.name]: true,
      },
    }))

    if (touchedField) {
      setFormState((prevFormState: FormState<FormValues>) => ({
        ...prevFormState,
        focused: {
          ...prevFormState.focused,
          [touchedField]: false,
        },
        touched: {
          ...prevFormState.touched,
          [touchedField]: true,
        },
      }))

      validate(touchedField, formState.values[touchedField])
    }
  }

  const setValue = (name: FieldName<FormValues>, value: string | number) => {
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        [name]: value,
      },
    })
  }

  return {
    formState: formState,
    handleFocus: handleFocus,
    handleChange: handleChange,
    resetForm: resetForm,
    setValue: setValue,
  }
}
