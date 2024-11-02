import {
  Container,
  createTheme,
  StepConnector,
  ThemeProvider,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import { Link, useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Check } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#784af4",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "8px",
  },
  topContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  footer: { marginTop: "auto", margin: "8px" },
  step: { cursor: "pointer !important" },
  buttonRow: { position: "absolute", bottom: 10 },
}));

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: theme.palette.primary.main,
    },
  },
  completed: {
    "& $line": {
      borderColor: theme.palette.primary.main,
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: theme.palette.primary.main,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: theme.palette.primary.main,
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const getSteps = () => {
  return [
    {
      title: "First",
      content: <div>First</div>,
    },
    {
      title: "Second",
      content: <div>Second</div>,
    },
    {
      title: "Third",
      content: <div>Third aa</div>,
    },
  ];
};

const HorizontalLinearStepper = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { step } = useParams();
  const activeStep = +(step ?? 0);
  const steps = getSteps();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.topContainer}>
        <div className={classes.root}>
          <Stepper
            alternativeLabel
            connector={<QontoConnector />}
            activeStep={activeStep}
          >
            {steps.map(({ title }, index) => (
              <Step
                className={classes.step}
                key={title}
                onClick={() => navigate(`/${index}`)}
              >
                <StepLabel StepIconComponent={QontoStepIcon}>{title}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed - you&apos;re finished
                </Typography>
              </div>
            ) : (
              <Container style={{ marginTop: "48px" }}>
                {steps[activeStep].content}
              </Container>
            )}
          </div>
        </div>
        <Box
          className={classes.footer}
          sx={{ display: "flex", flexDirection: "row", pt: 2 }}
        >
          <Button
            component={Link}
            to={`/${activeStep - 1}`}
            disabled={activeStep === 0}
            className={classes.button}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button
            component={Link}
            to={`/${activeStep + 1}`}
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={activeStep === steps.length - 1}
          >
            Next
          </Button>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default HorizontalLinearStepper;
