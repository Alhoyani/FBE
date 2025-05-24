import { Container, Typography, Tabs, Tab, Box, useTheme, useMediaQuery } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery, useGetTemplatesQuery } from '@/features/home/home';
import { TemplatesGrid } from '@/components/Content/TemplatesGrid';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

function Templates() {
  // Destructure t function from react-i18next
  const { t } = useTranslation();

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobilexs = useMediaQuery(theme.breakpoints.down(376));

  const { data: categories = [], isLoading: isLoadingCategories } = useGetCategoriesQuery();
  const { data: templates = [], isLoading: isLoadingTemplates } = useGetTemplatesQuery();

  const handleTabChange = (_: any, newValue: any) => {
    setSelectedTab(newValue);
  };

  const handleCardClick = (templateId: number) => {
    setSelectedTemplate(templateId);
  };

  const filteredTemplates =
    selectedTab === 0
      ? templates
      : templates.filter((template) => template.category === categories[selectedTab - 1]?.id);

  useEffect(() => {
    // Set the first template as selected by default when templates are loaded
    if (filteredTemplates.length > 0 && selectedTemplate === null) {
      setSelectedTemplate(filteredTemplates[0].id);
    }
  }, [filteredTemplates, selectedTemplate]);

  return (
    <Container maxWidth="lg">
      <Box
        textAlign="center"
        mt={4}
        mb={4}
        width="100%"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            color: '#0E41FC',
            fontFamily: 'Poppins',
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: '500',
            mb: '12px',
          }}
        >
          {/* Use t('someKey') for translations */}
          {t('templates.chooseYourTemplate')}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontSize: isMobilexs ? '20px' : isMobile ? '24px' : '34px',
            fontWeight: '700',
            width: isMobile ? '364px' : '680px',
            alignSelf: 'center',
            color: '#000',
          }}
        >
          {t('templates.jobWinningResumeTemplates')}
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        mb={4}
        sx={{
          borderRadius: '12px',
          backgroundColor: '#FFF',
          maxWidth: 'fit-content',
          marginInline: 'auto',
          paddingInline: '12px',
        }}
      >
        <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable" sx={{ maxHeight: '55px' }}>
          {/* "All Templates" Tab */}
          <Tab label={t('templates.allTemplates')} />
          {/* Dynamic Tabs based on categories */}
          {categories.map((category) => (
            <Tab key={category.id} label={i18n.language == 'en' ? category.name : category.name_ar} />
          ))}
        </Tabs>
      </Box>

      {isLoadingCategories || isLoadingTemplates ? (
        <Typography textAlign="center">{t('common.loading')}</Typography>
      ) : (
        <TemplatesGrid
          templates={filteredTemplates}
          selectedTemplate={selectedTemplate}
          onCardClick={handleCardClick}
          onUseCard={(templateId) => navigate('/create', { state: { templateId } })}
        />
      )}
    </Container>
  );
}

export default Templates;
