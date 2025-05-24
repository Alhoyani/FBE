import React, { useState } from 'react';
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
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { t } from 'i18next';

interface SocialEntry {
  id: number;
  label: string;
  link: string;
}

interface SocialProps {
  initialData: SocialEntry[];
  onUpdate: (updatedData: { social_links: SocialEntry[] }) => void;
}

const SocialSchema = Yup.object().shape({
  socialEntries: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().required('Label is required'),
      link: Yup.string().required('Link is required'),
    }),
  ),
});

const Social: React.FC<SocialProps> = ({ initialData, onUpdate }) => {
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

    if (active.id !== over.id) {
      const oldIndex = values.socialEntries.findIndex((entry: any) => entry.id === active.id);
      const newIndex = values.socialEntries.findIndex((entry: any) => entry.id === over.id);

      const newItems: any = arrayMove(values.socialEntries, oldIndex, newIndex);
      setFieldValue('socialEntries', newItems);
      onUpdate({ social_links: newItems });
    }
  };

  return (
    <Formik
      initialValues={{ socialEntries: initialData }}
      validationSchema={SocialSchema}
      onSubmit={(values) => {
        onUpdate({ social_links: values.socialEntries });
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Box
            p={2}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '16px',
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography sx={{ fontSize: '18px', fontWeight: '600', fontFamily: 'Poppins' }}>
                {t('Websites & Social Links')}
              </Typography>
            </Box>
            <FieldArray name="socialEntries">
              {({ push, remove }) => (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => handleDragEnd(event, values, setFieldValue)}
                >
                  <SortableContext
                    items={values.socialEntries.map((entry) => entry.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {values.socialEntries.map((entry, index) => (
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
                            expanded={expanded === index}
                            onChange={handleAccordionChange(index)}
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
                                {entry.label || t('newEntry')}
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
                                      {t('Label')}
                                    </InputLabel>
                                    <Field
                                      size="small"
                                      name={`socialEntries[${index}].label`}
                                      as={TextField}
                                      placeholder={t('Label')}
                                      variant="outlined"
                                      fullWidth
                                      sx={{ borderRadius: '8px' }}
                                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setFieldValue(`socialEntries[${index}].label`, e.target.value);
                                        const updatedEntries = [...values.socialEntries];
                                        updatedEntries[index].label = e.target.value;
                                        onUpdate({ social_links: updatedEntries });
                                      }}
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
                                      {t('link')}
                                    </InputLabel>
                                    <Field
                                      size="small"
                                      name={`socialEntries[${index}].link`}
                                      as={TextField}
                                      placeholder={t('link')}
                                      variant="outlined"
                                      fullWidth
                                      sx={{ borderRadius: '8px' }}
                                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setFieldValue(`socialEntries[${index}].link`, e.target.value);
                                        const updatedEntries = [...values.socialEntries];
                                        updatedEntries[index].link = e.target.value;
                                        onUpdate({ social_links: updatedEntries });
                                      }}
                                    />
                                  </Box>
                                </Box>
                              </Box>
                            </AccordionDetails>
                          </Accordion>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent toggling accordion
                              const updatedEntries = [...values.socialEntries];
                              updatedEntries.splice(index, 1);
                              setFieldValue('socialEntries', updatedEntries);
                              onUpdate({ social_links: updatedEntries });
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
                      onClick={() => {
                        const newItem = {
                          id: values.socialEntries.length + 1,
                          label: '',
                          link: '',
                        };
                        const updatedEntries = [...values.socialEntries, newItem];
                        setFieldValue('socialEntries', updatedEntries);
                        onUpdate({ social_links: updatedEntries });
                        // push(newItem);
                      }}
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
      )}
    </Formik>
  );
};

export default Social;
