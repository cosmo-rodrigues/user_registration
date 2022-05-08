// @ts-nocheck
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import Panel from './Panel';
import { IUserInfo } from '../../dtos';
import { userService } from '../../services/user';
import { AuthContext } from '../../context/Auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_VALUES } from './defaultValues';

const toastCustomId1 = 'fregnw984y5wr';
const toastCustomId2 = 'fregnw984y545';

export function AddEdit({ user = DEFAULT_VALUES }) {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(1);
  const { handleUserData } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<IUserInfo>(user);
  const [addressInfo, setAddressInfo] = useState<IAddress>({} as IAddress);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('O nome me é obrigatório')
      .min(3, 'O nome deve ter pelo meno 3 letras'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    cpf: Yup.number()
      .required()
      .min(11, 'O CPF deve tem 11 dígitos')
      .max(11, 'O CPF deve tem 11 dígitos'),
    pis: Yup.number()
      .required()
      .min(11, 'O PIS deve tem 11 dígitos')
      .max(11, 'O PIS deve tem 11 dígitos'),
    password: Yup.string()
      .concat(!user.id ? Yup.string().required('A senha é obrigatória') : '')
      .min(8, 'A senha deve ter pelo menos 8 caracteres'),
    confirmPassword: Yup.string()
      .when('password', (password, schema) => {
        if (password || !user.id) return schema.required('Confirme sua senha');
      })
      .oneOf([Yup.ref('password')], 'As senhas não conferem'),
  });

  const handleTabChange = (_event: Event, newValue: number) => {
    setTabIndex(newValue);
  };

  const onChangeProfile = (field: string, value: string) => {
    let item = userInfo;
    item[field] = value;
    setUserInfo({ ...item });
  };

  const onChangeAddress = (field: string, value: string | number) => {
    let item = addressInfo;
    item[field] = value;
    setAddressInfo({ ...item });
  };

  async function createUser() {
    let item = userInfo;
    item.address = addressInfo;
    setUserInfo({ ...item });

    try {
      const createdUser = await (await userService.create(item)).data;
      handleUserData(createdUser.user);
      toast.success('Cadastro realizado com sucesso!', { autoClose: 5000 });
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 5000,
        toastId: toastCustomId1,
      });
    }
  }

  async function updateUser() {
    let item = userInfo;
    item.address = addressInfo;
    setUserInfo({ ...item });

    try {
      const updatedUser = await (await userService.update(user.id, item)).data;
      handleUserData(updatedUser.user);
      toast.success('Dados atualizados com sucesso!', { autoClose: 5000 });
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 5000,
        toastId: toastCustomId2,
      });
    }
  }

  function handleUserSubmit(fields: IUserInfo) {
    if (!user.id) {
      createUser(fields);
    } else {
      updateUser(user.id, fields);
    }
  }

  return (
    <Box sx={{ width: '90%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabIndex}
          onChange={(event, newValue) => handleTabChange(event, newValue)}
          variant='fullWidth'
        >
          <Tab value={1} label='Perfil' />
          <Tab value={2} label='Endereço' />
          <Tab value={3} label='Preferências' />
          <Tab value={4} label='Dados Bancários' />
        </Tabs>
      </Box>
      <Box>
        <Formik initialValues={userInfo} validationSchema={validationSchema}>
          {({
            errors,
            handleBlur,
            handleChange,
            setFieldValue,
            handleSubmit,
            touched,
            values,
          }) => (
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
              onSubmit={handleSubmit}
            >
              {errors.submit && (
                <Alert
                  mt={2}
                  mb={1}
                  severity='warning'
                  style={{ margin: '15px 0 15px 0' }}
                >
                  {errors.submit}
                </Alert>
              )}

              <Panel value={tabIndex} index={1}>
                <Card>
                  <CardContent>
                    <Typography
                      variant='h6'
                      gutterBottom
                      style={{
                        marginTop: '10px',
                        marginBottom: '20px',
                        borderBottom: '1px dashed #d4d4d4',
                      }}
                    >
                      Dados Pessoais
                    </Typography>

                    <Grid
                      container
                      spacing={2}
                      style={{ marginTop: '10px', marginBottom: '10px' }}
                    >
                      <Grid item xs={12} md={6}>
                        <TextField
                          name='name'
                          label='Nome*'
                          fullWidth
                          value={values.name}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            setFieldValue('name', e.target.value);
                            onChangeProfile('name', e.target.value);
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          name='email'
                          label='Email*'
                          type='email'
                          fullWidth
                          value={values.email}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            setFieldValue('email', e.target.value);
                            onChangeProfile('email', e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      style={{ marginTop: '10px', marginBottom: '10px' }}
                    >
                      <Grid item md={6} xs={12}>
                        <TextField
                          name='pis'
                          label='PIS*'
                          fullWidth
                          value={values.pis}
                          error={Boolean(touched.pis && errors.pis)}
                          helperText={touched.pis && errors.pis}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            setFieldValue('pis', +e.target.value);
                            onChangeProfile('pis', +e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          name='cpf'
                          label='CPF*'
                          fullWidth
                          value={values.cpf}
                          error={Boolean(touched.cpf && errors.cpf)}
                          helperText={touched.cpf && errors.cpf}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            setFieldValue('cpf', e.target.value);
                            onChangeProfile('cpf', +e.target.value);
                          }}
                        />
                      </Grid>
                      {!user.id ? (
                        <>
                          <Grid item md={6} xs={12}>
                            <TextField
                              name='password'
                              type='password'
                              label='Senha*'
                              value={values.password || ''}
                              error={Boolean(
                                touched.password && errors.password
                              )}
                              helperText={touched.password && errors.password}
                              onBlur={handleBlur}
                              fullWidth
                              onChange={(e) => {
                                handleChange(e);
                                setFieldValue('password', e.target.value);
                                onChangeProfile('password', e.target.value);
                              }}
                            />
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <TextField
                              name='passwordConfirmation'
                              type='password'
                              label='Confirme sua senha*'
                              value={values.passwordConfirmation || ''}
                              error={Boolean(
                                touched.passwordConfirmation &&
                                  errors.passwordConfirmation
                              )}
                              helperText={
                                touched.passwordConfirmation &&
                                errors.passwordConfirmation
                              }
                              onBlur={handleBlur}
                              fullWidth
                              onChange={(e) => {
                                handleChange(e);
                                setFieldValue(
                                  'passwordConfirmation',
                                  e.target.value
                                );
                                onChangeProfile(
                                  'passwordConfirmation',
                                  e.target.value
                                );
                              }}
                            />
                          </Grid>
                        </>
                      ) : null}
                    </Grid>
                    <Alert mt={2} mb={1} severity='info'>
                      *Campos obrigatórios
                    </Alert>
                  </CardContent>
                </Card>
              </Panel>

              <Panel value={tabIndex} index={2}>
                <Card>
                  <CardContent>
                    <Typography
                      variant='h6'
                      gutterBottom
                      style={{
                        marginTop: '10px',
                        marginBottom: '20px',
                        borderBottom: '1px dashed #d4d4d4',
                      }}
                    >
                      Endereço
                    </Typography>
                    <Grid container spacing={6}>
                      <Grid item md={4} xs={12}>
                        <TextField
                          name='country'
                          label='País*'
                          fullWidth
                          value={values.country}
                          error={Boolean(touched.country && errors.country)}
                          helperText={touched.country && errors.country}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            setFieldValue('country', e.target.value);
                            onChangeAddress('country', e.target.value);
                          }}
                        />
                      </Grid>

                      <Grid item md={4} xs={12}>
                        <TextField
                          name='state'
                          label='Estado*'
                          fullWidth
                          value={values.state}
                          error={Boolean(touched.state && errors.state)}
                          helperText={touched.state && errors.state}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            setFieldValue('state', e.target.value);
                            onChangeAddress('state', e.target.value);
                          }}
                        />
                      </Grid>

                      <Grid item md={4} xs={12}>
                        <TextField
                          name='zipCode'
                          label='CEP**'
                          fullWidth
                          value={values.zipCode}
                          error={Boolean(touched.zipCode && errors.zipCode)}
                          helperText={touched.zipCode && errors.zipCode}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            setFieldValue('zipCode', e.target.value);
                            onChangeAddress('zipCode', e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={6}
                      style={{ marginTop: '10px', marginBottom: '10px' }}
                    >
                      <Grid item md={6} xs={12}>
                        <TextField
                          name='county'
                          label='Município*'
                          fullWidth
                          value={values.county}
                          error={Boolean(touched.county && errors.county)}
                          helperText={touched.county && errors.county}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            setFieldValue('county', e.target.value);
                            onChangeAddress('county', e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          name='street'
                          label='Rua*'
                          fullWidth
                          value={values.street}
                          error={Boolean(touched.street && errors.street)}
                          helperText={touched.street && errors.street}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            setFieldValue('street', e.target.value);
                            onChangeAddress('street', e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          name='number'
                          label='Número*'
                          value={values.number || ''}
                          error={Boolean(touched.number && errors.number)}
                          helperText={touched.number && errors.number}
                          onBlur={handleBlur}
                          fullWidth
                          onChange={(e) => {
                            handleChange(e);
                            setFieldValue('number', e.target.value);
                            onChangeAddress('number', e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          name='complement'
                          label='Complemento*'
                          value={values.complement || ''}
                          error={Boolean(
                            touched.complement && errors.complement
                          )}
                          helperText={touched.complement && errors.complement}
                          onBlur={handleBlur}
                          fullWidth
                          onChange={(e) => {
                            handleChange(e);
                            setFieldValue('complement', e.target.value);
                            onChangeAddress('complement', e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Panel>

              <Panel value={tabIndex} index={3}>
                <Card>
                  <CardContent>
                    <Typography
                      variant='h6'
                      gutterBottom
                      style={{
                        marginTop: '10px',
                        marginBottom: '20px',
                        borderBottom: '1px dashed #d4d4d4',
                      }}
                    >
                      Passatempos e Hobbies
                    </Typography>
                  </CardContent>
                </Card>
              </Panel>

              <Panel value={tabIndex} index={4}>
                <Card>
                  <CardContent>
                    <Typography
                      variant='h6'
                      gutterBottom
                      style={{
                        marginTop: '10px',
                        marginBottom: '20px',
                        borderBottom: '1px dashed #d4d4d4',
                      }}
                    >
                      Dados Bancários
                    </Typography>
                  </CardContent>
                </Card>
              </Panel>
              <Button
                color='primary'
                variant='contained'
                onClick={() => handleUserSubmit()}
                style={{
                  alignSelf: 'flex-end',
                  marginTop: '15px',
                }}
              >
                {!user.id ? 'Cadastrar' : 'Atualizar'}
              </Button>
            </form>
          )}
        </Formik>
        <ToastContainer />
      </Box>
    </Box>
  );
}
