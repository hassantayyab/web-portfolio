import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactEmail({
  name,
  email,
  subject,
  message,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission: {subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>📧 New Contact Message</Heading>
          </Section>

          <Section style={content}>
            <div style={field}>
              <Text style={label}>From:</Text>
              <Text style={value}>
                {name} &lt;{email}&gt;
              </Text>
            </div>

            <div style={field}>
              <Text style={label}>Subject:</Text>
              <Text style={value}>{subject}</Text>
            </div>

            <div style={field}>
              <Text style={label}>Message:</Text>
              <div style={messageBox}>
                <Text style={messageText}>{message}</Text>
              </div>
            </div>

            <Hr style={hr} />

            <Text style={footer}>
              This email was sent from your portfolio contact form.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles - Matching portfolio dark theme
const main = {
  backgroundColor: "#0f0f14", // Dark background matching portfolio
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: "20px 0",
};

const container = {
  backgroundColor: "#1a1a20", // Dark card background
  margin: "0 auto",
  padding: "0",
  maxWidth: "600px",
  borderRadius: "16px",
  overflow: "hidden",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.5)",
};

const header = {
  background: "linear-gradient(135deg, #f4ff00 0%, #e8ff00 100%)", // Yellow accent matching app primary color
  padding: "32px 30px",
};

const headerTitle = {
  color: "#0f0f14", // Dark text on bright background
  fontSize: "26px",
  fontWeight: "bold",
  margin: "0",
  letterSpacing: "-0.01em",
};

const content = {
  padding: "32px 30px",
};

const field = {
  marginBottom: "24px",
};

const label = {
  color: "#f4ff00", // Yellow accent matching app primary color
  fontWeight: "600",
  fontSize: "13px",
  margin: "0 0 8px 0",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const value = {
  color: "#f2f2f2", // Light text on dark background
  fontSize: "16px",
  margin: "0",
  lineHeight: "1.6",
};

const messageBox = {
  backgroundColor: "rgba(255, 255, 255, 0.05)", // Subtle background
  padding: "18px",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
};

const messageText = {
  color: "#e6e6e6",
  fontSize: "15px",
  lineHeight: "1.7",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const hr = {
  borderColor: "rgba(255, 255, 255, 0.1)",
  margin: "24px 0",
};

const footer = {
  color: "#999999",
  fontSize: "13px",
  margin: "0",
  textAlign: "center" as const,
};

export default ContactEmail;

