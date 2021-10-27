import { useContext } from 'react'

import { Button, FormControl, FormErrorMessage, Heading, IconButton, Input, Text, VStack } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { app } from '../providers/AppProvider'
import { settingsContext } from '../providers/SettingsProvider'
import { audio } from '../utilities'

const RequestResetPassword = () => {
  // Get sound fx state from the context
  const { soundFXSetting } = useContext(settingsContext)
  const [ soundFx ] = soundFXSetting

  const backBtnHandler = () => soundFx && audio.menuClick.play()

  const formValidation = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Email is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    return errors
  }

  const formSubmitHandler = async (values, actions) => {
    try {
      await app.emailPasswordAuth.sendResetPasswordEmail(values.email)
    } catch (err) {
      actions.setErrors({all: err.error})
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <VStack spacing={8}>
      <Heading>
        <Link to="/">
          <IconButton icon={<FaArrowLeft/>} rounded="full" onClick={backBtnHandler}/>
        </Link> Forgot Password
      </Heading>
      <Formik
        initialValues={{ email: ''}}
        onSubmit={formSubmitHandler}
        validate={formValidation}
      >
        {({errors, isSubmitting}) => (
          <Form>
            <Field name="email">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.email && form.touched.email}>
                  <Input type="email" {...field} id="email" rounded="full" placeholder="email address"/>
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button type="submit" isLoading={isSubmitting} mt={4} colorScheme="orange" variant="solid" rounded="full">Request new password</Button>
            {errors.all && <Text mt={8} color="red.500">{errors.all}</Text>}
          </Form>
        )}
      </Formik>
    </VStack>
  )

}

export default RequestResetPassword