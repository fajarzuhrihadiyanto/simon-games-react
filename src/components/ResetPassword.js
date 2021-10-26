import * as Realm from 'realm-web'
import { Button, FormControl, FormErrorMessage, Heading, Input, Text, VStack } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { useHistory } from 'react-router-dom'

const app = Realm.App.getApp(process.env.REACT_APP_ID)

const ResetPassword = () => {
  const history = useHistory()

  // Get the token and token id from url params
  const params = new URLSearchParams(window.location.search)
  const token = params.get("token")
  const tokenId = params.get("tokenId")

  // If there is no token or no token id, go to the index page
  if (!token || !tokenId) {
    history.push('/')
  }

  const formValidation = values => {
    const errors = {}
    if (!values.newPassword) {
      errors.newPassword = 'new password is required'
    }
    return errors
  }

  const formSubmitHandler = async (values, actions) => {
    try {
      await app.emailPasswordAuth.resetPassword(token, tokenId, values.newPassword)
      history.push('/')
    } catch (err) {
      actions.setErrors({all: err.error})
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <VStack spacing={8}>
      <Heading>Reset Password</Heading>
      <Formik
        initialValues={{ newPassword: ''}}
        onSubmit={formSubmitHandler}
        validate={formValidation}
      >
        {({errors, isSubmitting}) => (
          <Form>
            <Field name="newPassword">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.newPassword && form.touched.newPassword}>
                  <Input type="password" {...field} id="newPassword" rounded="full" placeholder="new password"/>
                  <FormErrorMessage>{form.errors.newPassword}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button type="submit" isLoading={isSubmitting} mt={4} colorScheme="orange" variant="solid" rounded="full">change password</Button>
            {errors.all && <Text mt={8} color="red.500">{errors.all}</Text>}
          </Form>
        )}
      </Formik>

    </VStack>
  )

}

export default ResetPassword