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
            <Heading style={headerTitle}>New Contact Form Submission</Heading>
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

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0",
  maxWidth: "600px",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const header = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  padding: "30px",
};

const headerTitle = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
};

const content = {
  padding: "30px",
};

const field = {
  marginBottom: "20px",
};

const label = {
  color: "#667eea",
  fontWeight: "bold",
  fontSize: "14px",
  margin: "0 0 5px 0",
};

const value = {
  color: "#333",
  fontSize: "16px",
  margin: "0",
};

const messageBox = {
  backgroundColor: "#f8f9fa",
  padding: "15px",
  borderRadius: "5px",
  border: "1px solid #e9ecef",
};

const messageText = {
  color: "#333",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const hr = {
  borderColor: "#e9ecef",
  margin: "20px 0",
};

const footer = {
  color: "#6c757d",
  fontSize: "12px",
  margin: "0",
};

export default ContactEmail;

