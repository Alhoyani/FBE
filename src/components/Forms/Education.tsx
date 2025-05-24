import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  InputLabel,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import dayjs from 'dayjs';
import { t } from 'i18next';

interface EducationEntry {
  id: number;
  school: string;
  degree: string;
  start_date: string | null;
  end_date: string | null;
  city: string;
  description: string;
}

interface EducationProps {
  initialData: EducationEntry[];
  onUpdate: (updatedData: { educations: EducationEntry[] }) => void;
}

const EducationSchema = Yup.object().shape({
  educationEntries: Yup.array().of(
    Yup.object().shape({
      school: Yup.string().required('School is required'),
      degree: Yup.string().required('Degree is required'),
      start_date: Yup.string().nullable().required('Start Date is required'),
      end_date: Yup.string().nullable().required('End Date is required'),
      city: Yup.string().required('City is required'),
      description: Yup.string().required('Description is required'),
    }),
  ),
});

const Education: React.FC<EducationProps> = ({ initialData, onUpdate }) => {
  const [expanded, setExpanded] = useState<number | false>(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
  );

  const handleAccordionChange = (id: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? id : false);
  };

  const handleDragEnd = (event: any, values: any, setFieldValue: any) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = values.educationEntries.findIndex((entry: any) => entry.id === active.id);
      const newIndex = values.educationEntries.findIndex((entry: any) => entry.id === over.id);

      const newItems = arrayMove(values.educationEntries, oldIndex, newIndex);
      setFieldValue('educationEntries', newItems);
      // Removed onUpdate from here as useEffect will handle it
    }
  };

  return (
    <Formik
      initialValues={{ educationEntries: initialData }}
      validationSchema={EducationSchema}
      onSubmit={(values) => {
        // You can handle form submission here if needed
        console.log('Form submitted:', values);
      }}
    >
      {({ values, setFieldValue }) => {
        // Debounced onUpdate to prevent excessive calls

        useEffect(() => {
          onUpdate({ educations: values.educationEntries });
          // Cleanup on unmount
        }, [values.educationEntries]);

        return (
          <Form>
            <Box
              p={2}
              sx={{
                backgroundColor: '#fff',
                borderRadius: '16px',
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography
                  sx={{
                    fontSize: '18px',
                    fontWeight: '600',
                    fontFamily: 'Poppins',
                  }}
                >
                  {t('Education')}
                </Typography>
              </Box>
              <FieldArray name="educationEntries">
                {({ push, remove }) => (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={(event) => handleDragEnd(event, values, setFieldValue)}
                  >
                    <SortableContext
                      items={values.educationEntries.map((entry) => entry.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {values.educationEntries.map((entry, index) => (
                        <SortableItem key={entry.id} id={entry.id} isReorderEnabled={true}>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              width: '100%',
                              alignItems: 'flex-start',
                              marginBottom: '16px',
                            }}
                          >
                            <Accordion
                              expanded={expanded === entry.id}
                              onChange={handleAccordionChange(entry.id)}
                              sx={{
                                border: '1px solid #ccc',
                                borderRadius: '8px !important',
                                boxShadow: 'none !important',
                                backgroundColor: '#FFF',
                                flex: 1,
                              }}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    fontFamily: 'Poppins',
                                    color: '#2B2A44',
                                  }}
                                >
                                  {entry.school || t('newEntry')}
                                </Typography>
                              </AccordionSummary>
                              <Divider variant="middle" />

                              <AccordionDetails>
                                <Box display="flex" flexDirection="column" gap={2}>
                                  <Box display="flex" gap={2}>
                                    <Box flex={1}>
                                      <InputLabel
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'flex-start',
                                        }}
                                      >
                                        {t('School')}
                                      </InputLabel>
                                      <Field
                                        size="small"
                                        name={`educationEntries[${index}].school`}
                                        as={TextField}
                                        placeholder={t('School')}
                                        variant="outlined"
                                        fullWidth
                                        sx={{ borderRadius: '8px' }}
                                      />
                                    </Box>
                                    <Box flex={1}>
                                      <InputLabel
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'flex-start',
                                        }}
                                      >
                                        {t('Degree')}
                                      </InputLabel>
                                      <Field
                                        size="small"
                                        name={`educationEntries[${index}].degree`}
                                        as={TextField}
                                        placeholder={t('Degree')}
                                        variant="outlined"
                                        fullWidth
                                        sx={{ borderRadius: '8px' }}
                                      />
                                    </Box>
                                  </Box>
                                  <Box display="flex" gap={2} justifyContent={'flex-start'}>
                                    <Box flex={1}>
                                      <InputLabel
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'flex-start',
                                        }}
                                      >
                                        {t('startDate')}
                                      </InputLabel>
                                      <Field name={`educationEntries[${index}].start_date`}>
                                        {({ field, form }: any) => (
                                          <DatePicker
                                            value={field.value ? dayjs(field.value, 'YYYY-MM-DD') : null}
                                            onChange={(date: any) => {
                                              form.setFieldValue(
                                                `educationEntries[${index}].start_date`,
                                                date ? dayjs(date).format('YYYY-MM-DD') : null,
                                              );
                                            }}
                                            format="YYYY-MM-DD"
                                            slotProps={{
                                              textField: {
                                                size: 'small',
                                                sx: {
                                                  width: '100%',
                                                },
                                              },
                                            }}
                                          />
                                        )}
                                      </Field>
                                    </Box>
                                    <Box flex={1}>
                                      <InputLabel
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'flex-start',
                                        }}
                                      >
                                        {t('endDate')}
                                      </InputLabel>
                                      <Field name={`educationEntries[${index}].end_date`}>
                                        {({ field, form }: any) => (
                                          <DatePicker
                                            value={field.value ? dayjs(field.value, 'YYYY-MM-DD') : null}
                                            onChange={(date) => {
                                              form.setFieldValue(
                                                `educationEntries[${index}].end_date`,
                                                date ? dayjs(date).format('YYYY-MM-DD') : null,
                                              );
                                            }}
                                            format="YYYY-MM-DD"
                                            slotProps={{
                                              textField: {
                                                size: 'small',
                                                sx: {
                                                  width: '100%',
                                                },
                                              },
                                            }}
                                          />
                                        )}
                                      </Field>
                                    </Box>
                                  </Box>
                                  <Box>
                                    <InputLabel
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                      }}
                                    >
                                      {t('City')}
                                    </InputLabel>
                                    <Field
                                      size="small"
                                      name={`educationEntries[${index}].city`}
                                      as={TextField}
                                      placeholder={t('City')}
                                      variant="outlined"
                                      fullWidth
                                      sx={{ borderRadius: '8px' }}
                                    />
                                  </Box>
                                  <Box>
                                    <InputLabel
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                      }}
                                    >
                                      {t('description')}
                                    </InputLabel>
                                    <Field
                                      size="small"
                                      name={`educationEntries[${index}].description`}
                                      as={TextField}
                                      placeholder={t('description')}
                                      variant="outlined"
                                      fullWidth
                                      multiline
                                      rows={4}
                                      sx={{ borderRadius: '8px' }}
                                    />
                                  </Box>
                                </Box>
                              </AccordionDetails>
                            </Accordion>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent toggling accordion
                                remove(index); // Remove the entry
                              }}
                              sx={{ marginInlineStart: '8px', marginTop: '5px' }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </SortableItem>
                      ))}
                    </SortableContext>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <Button
                        onClick={() =>
                          push({
                            id:
                              values.educationEntries.length > 0
                                ? Math.max(...values.educationEntries.map((e) => e.id)) + 1
                                : 1,
                            school: '',
                            degree: '',
                            start_date: null,
                            end_date: null,
                            city: '',
                            description: '',
                          })
                        }
                        color="primary"
                        sx={{
                          marginTop: '16px',
                          alignSelf: 'flex-start',

                          '&:hover': {
                            backgroundColor: '#FFF',
                          },
                        }}
                      >
                        {t('addMore')}
                      </Button>
                    </Box>
                  </DndContext>
                )}
              </FieldArray>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Education;
