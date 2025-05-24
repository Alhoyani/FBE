import { FC } from 'react';
import { Stack, Box } from '@mui/material';
import ResumeHeader from '@/components/Forms/Header';
import PersonalDetailsForm from '@/components/Forms/PersonalDetailsForm';
import AboutMe from '@/components/Forms/AboutMe';
import EmploymentHistory from '@/components/Forms/EmploymentHistory';
import Education from '@/components/Forms/Education';
import MultiSelectTags from '@/components/Forms/Skills';
import Social from '../Forms/Social';
import React from 'react';
import Languages from '../Forms/langaues';

interface EditorPanelProps {
  response: any;
  isMobile: boolean;
  handleChange: (data: any) => void;
  initialSelectedSkills: number[];
  skillsData: any[];
  initialSelectedSoftSkills: number[];
  softSkillsData: any[];
}

const EditorPanel: FC<EditorPanelProps> = ({
  response,
  isMobile,
  handleChange,
  initialSelectedSkills,
  skillsData,
  softSkillsData,
  initialSelectedSoftSkills,
}) => {
  const [sections, setSections] = React.useState({
    work_experiences: response.work_experiences.length > 0,
    educations: response.educations.length > 0,
    technical_skills: response.technical_skills.length > 0,
    soft_skills: response.technical_skills.length > 0,
    languages: response.languages.length > 0,
    social_links: response.social_links.length > 0,
  });
  const handleSectionSelect = (selectedSection: string) => {
    setSections((prevSections) => ({
      ...prevSections,
      [selectedSection]: true, // Update the selected section to true
    }));
  };

  return (
    <Stack
      direction={'column'}
      sx={{
        justifyContent: 'flex-start',
        paddingBlock: '50px',
        rowGap: '12px',
        paddingBottom: isMobile ? '100px' : '100px',
        maxWidth: isMobile ? '100%' : '50%',
      }}
      flex={1}
    >
      <Box
        sx={{
          paddingInline: isMobile ? '0px' : '44px',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '12px',
        }}
      >
        <ResumeHeader name={response.full_name} sections={sections} onSectionSelect={handleSectionSelect} />
        <PersonalDetailsForm
          initialData={{
            full_name: response.full_name,
            email: response.email,
            phone: response.phone,
            country: response.country,
            city: response.city,
            photo: '',
            job_title: response.job_title,
          }}
          onUpdate={handleChange}
        />
        <AboutMe aboutMe={response.summary} onUpdate={handleChange} />
        {sections.work_experiences && (
          <EmploymentHistory
            initialData={response.work_experiences.map((exp: any, i: number) => ({ ...exp, id: i }))}
            onUpdate={handleChange}
          />
        )}
        {sections.social_links && (
          <Social
            initialData={response.social_links.map((link: any, i: number) => ({ ...link, id: i }))}
            onUpdate={handleChange}
          />
        )}
        {sections.educations && (
          <Education
            initialData={response?.educations?.map((edu: any, i: number) => ({ ...edu, id: i }))}
            onUpdate={handleChange}
          />
        )}
        {sections.languages && (
          <Languages
            initialData={response.languages.map((item: any, index: number) => {
              return { id: index + 1, name: item.name };
            })}
            onUpdate={handleChange}
          />
        )}
        {/* <Social initialData={response.social_links} onUpdate={handleChange} /> */}
        {sections.technical_skills && (
          <MultiSelectTags
            initialSelectedSkills={initialSelectedSkills}
            skillsData={skillsData}
            onUpdate={handleChange}
            name={'technical_skills'}
          />
        )}
        {sections.soft_skills && (
          <MultiSelectTags
            initialSelectedSkills={initialSelectedSoftSkills}
            skillsData={softSkillsData}
            onUpdate={handleChange}
            name={'soft_skills'}
          />
        )}
      </Box>
    </Stack>
  );
};

export default EditorPanel;
