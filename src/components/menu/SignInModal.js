import * as assert from 'assert'

import * as Realm from 'realm-web'
import { Button, FormControl, FormErrorMessage, Input, Link, Text } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'

import ModalWrapper from '../multiused/ModalWrapper'

const app = Realm.App.getApp(process.env.REACT_APP_ID)

const SignInModal = ({ signInModalOpen, signInModalOnClose, setIsLoggedIn }) => {
  const formValidation = values => {
    const errors = {}
    // Check for the email field
    if (!values.email) {
      errors.email = 'Email is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }

    // Check for the password field
    if (!values.password) {
      errors.password = 'Password is required'
    }
    return errors
  }

  const formSubmitHandler = async (values, actions) => {
    try {
      // Login using given credential
      const credential = Realm.Credentials.emailPassword(values.email, values.password)
      const user = await app.logIn(credential)

      // Check if logged in user match current user from realm
      assert(user.id === app.currentUser.id)

      // If there is logged in user, change logged in state and close the modal
      if (user) {
        setIsLoggedIn(true)
        signInModalOnClose()
      }
    } catch (e) {
      // Display error to the form
      actions.setErrors({all: e.error})
    } finally {
      // Stop loading button effect
      actions.setSubmitting(false)
    }
  }

  return (
    <ModalWrapper
      size="sm"
      title="Sign In"
      isOpen={signInModalOpen}
      onClose={signInModalOnClose}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={formSubmitHandler}
        validate={formValidation}>
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

            <Field name="password">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.password && form.touched.password} mt={4}>
                  <Input type="password" {...field} id="password" rounded="full" placeholder="password"/>
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Link href="/forgot-password"><Text mt={4} color="blue.500">forgot password ?</Text></Link>

            <Button type="submit" isLoading={isSubmitting} mt={4} colorScheme="orange" variant="solid" rounded="full">Sign In</Button>
            {errors.all && <Text mt={8} color="red.500">{errors.all}</Text>}
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  )
}

export default SignInModal