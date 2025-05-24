import React, { useState, useEffect, useMemo } from 'react';
import { Box, Button, Chip, Typography, TextField } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import More from '@/assets/more.svg';
import { t } from 'i18next';

type Skill = {
  id: number;
  label: string;
};

interface MultiSelectTagsProps {
  initialSelectedSkills?: number[]; // Pre-selected skill IDs
  skillsData: Skill[]; // Available skills
  onUpdate?: (selectedSkills: Partial<Record<'soft_skills' | 'technical_skills', { name: string }[]>>) => void; // // Callback for updates
  name: 'technical_skills' | 'soft_skills';
}
const MultiSelectTags: React.FC<MultiSelectTagsProps> = ({
  initialSelectedSkills = [],
  skillsData: initialSkillsData,
  onUpdate,
  name,
}) => {
  const [allSkills, setAllSkills] = useState<Skill[]>(initialSkillsData);
  const [selectedSkills, setSelectedSkills] = useState<number[]>(initialSelectedSkills);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkillLabel, setNewSkillLabel] = useState('');

  // Memoized selected skill objects
  const selectedSkillObjects = () => {
    return selectedSkills
      .map((id) => {
        const skill = allSkills.find((skill) => skill.id === id);
        return skill ? { name: skill.label } : null;
      })
      .filter((skill) => skill !== null) as { name: string }[];
  };

  // Detect if skills have changed
  const skillsChanged = () => {
    return (
      initialSelectedSkills.length !== selectedSkills.length ||
      !initialSelectedSkills.every((id) => selectedSkills.includes(id))
    );
  };

  useEffect(() => {
    if (skillsChanged() && !isAddingSkill) {
      onUpdate?.({ [name]: selectedSkillObjects() });
    }
  }, [selectedSkills, isAddingSkill]);

  const toggleSkill = (id: number) => {
    setSelectedSkills((prev) => (prev.includes(id) ? prev.filter((skillId) => skillId !== id) : [...prev, id]));
  };

  const handleAddSkill = () => {
    const trimmed = newSkillLabel.trim();
    if (trimmed === '') return;

    const newId = allSkills.length ? Math.max(...allSkills.map((s) => s.id)) + 1 : 1;
    const newSkill: Skill = { id: newId, label: trimmed };

    setAllSkills((prev) => [...prev, newSkill]);
    setSelectedSkills((prev) => [...prev, newId]);
    setNewSkillLabel('');
    setIsAddingSkill(false);
  };

  return (
    <Box
      p={2}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: '16px',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      <Typography sx={{ fontSize: '18px', fontWeight: '600', fontFamily: 'Poppins', mb: 2 }}>
        {name == 'soft_skills' ? t('Soft skills') : t('Technical skills')}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        {allSkills.map((skill) => (
          <Chip
            key={skill.id}
            label={skill.label}
            onDelete={() => toggleSkill(skill.id)}
            onClick={() => toggleSkill(skill.id)}
            deleteIcon={
              selectedSkills.includes(skill.id) ? (
                <DoneIcon style={{ fill: '#FFF' }} />
              ) : (
                <Box component={'img'} src={More} />
              )
            }
            sx={{
              cursor: 'pointer',
              backgroundColor: selectedSkills.includes(skill.id) ? 'primary.main' : 'grey.200',
              color: selectedSkills.includes(skill.id) ? 'white' : 'text.primary',
              '&:hover': {
                backgroundColor: selectedSkills.includes(skill.id) ? 'primary.main' : 'grey.200',
              },
              '& .MuiChip-deleteIcon': {
                color: '#FFF',
                '&:hover': {
                  backgroundColor: selectedSkills.includes(skill.id) ? 'primary.main' : 'grey.200',
                  color: '#FFF',
                  borderRadius: '50%',
                },
              },
              paddingInlineEnd: 1,
            }}
          />
        ))}
      </Box>

      <Box mt={2}>
        {!isAddingSkill ? (
          <Button
            onClick={() => setIsAddingSkill(true)}
            color="primary"
            sx={{
              '&:hover': {
                backgroundColor: '#FFF',
              },
            }}
          >
            {t('addMore')}
          </Button>
        ) : (
          <Box display="flex" gap={1} alignItems="center">
            <TextField
              size="small"
              variant="outlined"
              placeholder="Enter new skill..."
              value={newSkillLabel}
              onChange={(e) => setNewSkillLabel(e.target.value)}
              autoFocus
              onKeyDownCapture={(e) => e.key === 'Enter' && handleAddSkill()}
            />
            <Button variant="outlined" color="primary" onClick={handleAddSkill}>
              {t('Add')}
            </Button>
            <Button
              variant="text"
              color="error"
              onClick={() => {
                setIsAddingSkill(false);
                setNewSkillLabel('');
              }}
            >
              {t('Cancel')}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MultiSelectTags;
