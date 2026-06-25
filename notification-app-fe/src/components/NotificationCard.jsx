import { Card, CardContent, Typography } from "@mui/material";

export function NotificationCard({ notification }) {
  const { Type, Message, Timestamp, viewed } = notification;
  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: viewed ? "white" : "#f0f8ff",
        borderLeft: viewed ? "4px solid transparent" : "4px solid #1976d2"
      }}
    >
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {Type}
        </Typography>
        <Typography variant="body1" fontWeight={viewed ? 400 : 600}>
          {Message}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {Timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
}
