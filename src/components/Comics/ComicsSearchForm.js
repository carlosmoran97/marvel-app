import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from'yup';

export default function ComicsSearchForm({ handleSubmit, handleClear }) {
    return (
        <Formik
            initialValues={{
                titleStartsWith: '',
                format: '',
                issueNumber: undefined
            }}
            validationSchema={Yup.object({
                titleStartsWith: Yup
                    .string()
                    .required('El titulo es requerido'),
                format: Yup
                    .string(),
                issueNumber: Yup.number()
            })}
            onSubmit={(values)=> {
                handleSubmit(values);
            }}
        >
            {({errors, touched, values, submitForm, handleChange})=>(
                <Form>
                    <Field name="titleStartsWith" type="text"/>
                    {(errors.titleStartsWith && touched.titleStartsWith) && <p>{errors.titleStartsWith}</p>}
                    <select
                        name="format"
                        value={values.format}
                        onChange={handleChange}
                    >
                        <option value="">Select a format</option>
                        <option value="comic">comic</option>
                        <option value="magazine">magazine</option>
                        <option value="trade paperback">trade paperback</option>
                        <option value="hardcover">hardcover</option>
                        <option value="digest">digest</option>
                        <option value="graphic novel">graphic novel</option>
                        <option value="digital comic">digital comic</option>
                        <option value="infinite comic">infinite comic</option>
                    </select>
                    <Field name="issueNumber" type="number" />
                    <button type="submit">Search</button>
                    <button type="button" onClick={handleClear}>Clear</button>
                </Form>
            )}
        </Formik>
    )
}
