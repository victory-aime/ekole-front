'use client';

import { BaseButton, FormTextInput, Icons } from '_components/custom';
import { VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '_hooks/useAuth';
import { Formik, FormikValues } from 'formik';
import { VALIDATION } from '_types/index';
import { useState } from 'react';
import { AuthBoxContainer } from './AuthBoxContainer';

export const SignIn = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (values: FormikValues) => {
    setIsLoading(true);
    await login({
      username: values.username,
      password: values.password,
    })
      .catch((error) => console.log('error', error))
      .finally(() => setIsLoading(false));
  };

  return (
    <AuthBoxContainer title={'Bienvenue !'}>
      <Formik
        initialValues={{ username: '', password: '' }}
        enableReinitialize
        onSubmit={handleSubmit}
        validationSchema={VALIDATION.loginValidationSchema}
      >
        {({ values, handleSubmit }) => (
          <VStack width="full" gap={4}>
            <FormTextInput
              name="username"
              placeholder={'FORM.EMAIL_PLACEHOLDER'}
              value={values.username}
              leftAccessory={<Icons.User />}
            />
            <FormTextInput
              name="password"
              type="password"
              placeholder={'FORM.PASSWORD_PLACEHOLDER'}
              value={values.password}
            />
            <BaseButton
              withGradient
              isLoading={isLoading}
              width={'full'}
              colorType={'primary'}
              onClick={() => {
                handleSubmit();
              }}
            >
              {t('COMMON.LOGIN')}
            </BaseButton>
          </VStack>
        )}
      </Formik>
    </AuthBoxContainer>
  );
};
