import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: any) {
    const url = process.env.BASE_URL + `auth/verify-email/${user.id}`;
    const date = new Date();
    try {
      const res = await this.mailerService.sendMail({
        to: user.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: "Welcome to ED-Cred! Confirm your Email",
        template: "./confirmation", // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          name: user.username,
          url,
          year: date.getFullYear(),
        },
      });
    } catch (error) {
      // Just log the error — do not throw to prevent backend crash
      console.error(
        "[Mailer] Failed to send confirmation email:",
        error?.message || error
      );
    }
  }
  async sendForgetPasswordEmail(email: string, token: string) {
    const url =
      process.env.FRONTEND_LOGIN_URL + `/login?reset=true&token=${token}`;

    try {
      const res = await this.mailerService.sendMail({
        to: email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: "Forget Password",
        template: "./resetPassword", // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          email: email,
          url,
        },
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
  async sendUserInvitation(
    user: any,
    name2: string,
    role: string,
    password: string
  ) {
    const url = process.env.BASE_URL + `auth/emailVerification/${user.id}`;

    try {
      const res = await this.mailerService.sendMail({
        to: user.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: "Welcome to Eq360! Confirm your Invitation",
        template: "./invitation", // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          name: user.username,
          email: user.email,
          name2,
          role,
          password,
          url,
        },
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
  async sendSubscriptionConfirmation(user: any, subscription: any) {
  const date = new Date();
  try {
    await this.mailerService.sendMail({
      to: user.email,
      subject: `You're subscribed to the ${subscription.title} plan on Ed-Cred!`,
      template: './subscription', // automatically appends `.hbs`
      context: {
        name: user.username,
        planTitle: subscription.title,
        planPrice: subscription.price,
        billingCycle: 'month', // hardcoded unless you support annual, etc.
        startDate: date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        features: subscription.features, // should be an array of strings
        manageUrl: `${process.env.FRONTEND_URL}dashboard`, // adjust accordingly
        year: date.getFullYear(),
      },
    });
  } catch (error) {
    console.error('[Mailer] Failed to send subscription confirmation email:', error?.message || error);
  }
}

}
