import * as assert from 'assert'

import * as Realm from 'realm-web'
import { Button, FormControl, FormErrorMessage, Input, Text } from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'

import ModalWrapper from '../multiused/ModalWrapper'

const app = Realm.App.getApp(process.env.REACT_APP_ID)

const SignUpModal = ({ signUpModalOpen, signUpModalOnClose, setIsLoggedIn }) => {
  const formValidation = values => {
    const errors = {}

    // Check for the username field
    if (!values.username) {
      errors.username = 'Username is required'
    }

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
      // Define collection from the database
      let db = app.currentUser.mongoClient("mongodb-atlas").db(process.env.REACT_APP_DB_NAME)
      let users = db.collection("user_profiles")

      // Get user with a given username to know if it is exist
      let user = await users.findOne({username: values.username})

      // If there is any user with a given username, then error
      if (user) {
        actions.setErrors({username: "username " + values.username + " already exist"})
        return
      }

      // If not, register new user
      await app.emailPasswordAuth.registerUser(values.email, values.password)

      // Then login with the new user
      user = await app.logIn(Realm.Credentials.emailPassword(values.email, values.password))

      // Check if logged in user match current user from realm
      assert(user.id === app.currentUser.id)

      if (user) {
        // Re-fetch the collection using the new user
        db = app.currentUser.mongoClient("mongodb-atlas").db(process.env.REACT_APP_DB_NAME)
        users = db.collection("user_profiles")

        // Create new profile for the new user
        await users.insertOne({
          user_id: app.currentUser.id,
          username: values.username
        })

        // change logged in state and close the modal
        setIsLoggedIn(true)
        signUpModalOnClose()
      }
    } catch (err) {
      // Display error to the form
      actions.setErrors({all: err.error})
    } finally {
      // Stop loading button effect
      actions.setSubmitting(false)
    }
  }

  return (
    <ModalWrapper
      size="sm"
      title="Sign In"
      isOpen={signUpModalOpen}
      onClose={signUpModalOnClose}>
      <Formik
        initialValues={{ email: '', password: '', username: '' }}
        onSubmit={formSubmitHandler}
        validate={formValidation}
      >
        {({errors, isSubmitting}) => (
          <Form>
            <Field name="username">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.username && form.touched.username}>
                  <Input type="text" {...field} id="username" rounded="full" placeholder="username"/>
                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="email">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.email && form.touched.email} mt={4}>
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

            <Button type="submit" isLoading={isSubmitting} mt={4} colorScheme="orange" variant="solid" rounded="full">Sign Up</Button>
            {errors.all && <Text mt={8} color="red.500">{errors.all}</Text>}
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  )

}

export default SignUpModal