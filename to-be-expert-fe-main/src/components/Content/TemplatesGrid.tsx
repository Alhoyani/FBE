import { Button, Card, CardContent, useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTranslation } from 'react-i18next';

export function TemplatesGrid({
  templates,
  selectedTemplate,
  onCardClick,
  onUseCard,
}: {
  templates: any[];
  selectedTemplate: number | null;
  onCardClick: (templateId: number) => void;
  onUseCard: (templateId: number) => void;
}) {
  const { t } = useTranslation(); // <-- Use react-i18next
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container spacing={2}>
      {templates.map((template) => (
        <Grid
          size={{
            xs: 6,
            sm: 6,
            md: 3,
          }}
          key={template.id}
        >
          <Card
            onClick={() => onCardClick(template.id)}
            sx={{
              minWidth: isMobile ? '160px' : '',
              height: isMobile ? '254px' : '479px',
              display: 'flex',
              flexDirection: 'column',
              backgroundImage: `url(${template.image})`,
              backgroundPosition: 'center',
              border: selectedTemplate === template.id ? '7px solid rgba(173, 192, 240, 0.35)' : 'none',
              cursor: 'pointer',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                height: '100%',
              }}
            >
              {selectedTemplate === template.id && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    fontSize: isMobile ? '8px' : '12px',
                    fontWeight: '400',
                    fontFamily: 'Poppins',
                    textTransform: 'none',
                    zIndex: 99,
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // To prevent firing onCardClick
                    onUseCard(template.id);
                  }}
                >
                  {t('templatesGrid.useThisTemplate')}
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
