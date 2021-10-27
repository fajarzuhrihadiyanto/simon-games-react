import { useContext } from 'react';

import { app } from '../providers/AppProvider'
import { settingsContext } from '../providers/SettingsProvider'
import { audio } from '../utilities'
import { Field, Form, Formik } from 'formik'
import { Button, FormControl, FormErrorMessage, FormLabel, Grid, Input, VStack } from '@chakra-ui/react'

const ProfileUsername = ({ username }) => {
  const { soundFXSetting } = useContext(settingsContext)
  const [ soundFx ] = soundFXSetting

  const formValidation = values => {
    const errors = {}
    // Check for the username field
    if (!values.username) {
      errors.username = 'Username is required'
    }
    return errors;
  }

  const formSubmitHandler = async (values, actions) => {
    try {
      soundFx && audio.menuClick.play()

      // find user with the given username
      const db = app.currentUser.mongoClient("mongodb-atlas").db(process.env.REACT_APP_DB_NAME)
      const users = db.collection("user_profiles")
      const foundUser = await users.findOne({username: values.username})

      // if user with the given username is exist, then error
      if (foundUser) {
        actions.setErrors({username: "username " + values.username + " already used by someone else"})
        return
      }

      // if not, update current user's username
      const result = await users.updateOne(
        {user_id: app.currentUser.id},
        {$set: {username: values.username}}
      )

      // if no matched count or no modified count, then error
      if (!result.matchedCount || !result.modifiedCount) actions.setErrors({username: "Something error, try again later"})
    } catch (err) {
      // Display error to the form
      actions.setErrors({username: err.error})
    } finally {
      // Stop loading button effect
      actions.setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{ username: username }}
      onSubmit={formSubmitHandler}
      validate={formValidation}
    >
      {({ isSubmitting}) => (
        <Form>
          <Field name="username">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.username && form.touched.username}>
                <Grid templateColumns={['auto 1fr']} gap={4}>
                  <FormLabel htmlFor="username" alignSelf={'end'} justifySelf={'end'}>Username</FormLabel>
                  <VStack>
                    <Input type="text" id="username" rounded="full" placeholder="username" {...field}/>
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </VStack>
                  <Button
                    gridColumnStart={2}
                    type="submit"
                    isLoading={isSubmitting}
                    colorScheme="orange"
                    variant="solid"
                    rounded="full">Change username</Button>
                </Grid>
              </FormControl>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  )
}

export default ProfileUsername