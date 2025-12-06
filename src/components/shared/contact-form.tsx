'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FORM_CONSTANTS } from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, Send } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  // Honeypot field - should remain empty
  website: z.string().max(0).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = useCallback(
    async (data: ContactFormData) => {
      // Honeypot check - if filled, it's likely a bot
      if (data.website) {
        toast.error('Spam detected. Please try again.');
        return;
      }

      setIsSubmitting(true);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          let errorMessage = result.error || 'Failed to send message';

          // User-friendly error messages
          if (response.status === 429) {
            const retryAfter = result.retryAfter
              ? ` Please try again in ${Math.ceil(result.retryAfter / 60)} minute${Math.ceil(result.retryAfter / 60) > 1 ? 's' : ''}.`
              : ' Please try again later.';
            errorMessage = "You've sent too many messages recently." + retryAfter;
          } else if (response.status >= 500) {
            errorMessage = 'Our server is experiencing issues. Please try again in a few moments.';
          }

          throw new Error(errorMessage);
        }

        setIsSuccess(true);
        toast.success("Message sent successfully! I'll get back to you soon.", {
          duration: FORM_CONSTANTS.SUCCESS_TIMEOUT_MS,
        });
        reset();

        // Reset success state after animation
        setTimeout(() => setIsSuccess(false), FORM_CONSTANTS.SUCCESS_TIMEOUT_MS);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to send message. Please try again.';
        toast.error(errorMessage, {
          duration: 5000,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [reset],
  );

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 sm:space-y-5 md:space-y-6'
      noValidate
      aria-label='Contact form'
    >
      {/* Honeypot field - hidden from real users */}
      <div className='absolute opacity-0 pointer-events-none' aria-hidden='true'>
        <input type='text' {...register('website')} tabIndex={-1} autoComplete='off' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6'>
        {/* Name */}
        <div className='space-y-2 sm:space-y-2.5'>
          <Label htmlFor='name' className='text-sm sm:text-base'>
            Name
          </Label>
          <Input
            id='name'
            placeholder='John Doe'
            {...register('name')}
            className='bg-white/5 border-white/15 focus:border-primary min-h-[44px] text-sm sm:text-base'
          />
          {errors.name && (
            <p className='text-xs sm:text-sm text-destructive font-medium'>{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className='space-y-2 sm:space-y-2.5'>
          <Label htmlFor='email' className='text-sm sm:text-base'>
            Email
          </Label>
          <Input
            id='email'
            type='email'
            placeholder='john@example.com'
            {...register('email')}
            className='bg-white/5 border-white/15 focus:border-primary min-h-[44px] text-sm sm:text-base'
          />
          {errors.email && (
            <p className='text-xs sm:text-sm text-destructive font-medium'>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div className='space-y-2 sm:space-y-2.5'>
        <Label htmlFor='subject' className='text-sm sm:text-base'>
          Subject
        </Label>
        <Input
          id='subject'
          placeholder="What's this about?"
          {...register('subject')}
          className='bg-white/5 border-white/15 focus:border-primary min-h-[44px] text-sm sm:text-base'
        />
        {errors.subject && (
          <p className='text-xs sm:text-sm text-destructive font-medium'>
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div className='space-y-2 sm:space-y-2.5'>
        <Label htmlFor='message' className='text-sm sm:text-base'>
          Message
        </Label>
        <Textarea
          id='message'
          placeholder='Tell me about your project or just say hello...'
          rows={6}
          {...register('message')}
          className='bg-white/5 border-white/15 focus:border-primary resize-none text-sm sm:text-base'
        />
        {errors.message && (
          <p className='text-xs sm:text-sm text-destructive font-medium'>
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit button */}
      <Button
        type='submit'
        disabled={isSubmitting || isSuccess}
        className='w-full md:w-auto px-8 py-3 h-auto min-h-[44px]'
        aria-label={isSubmitting ? 'Sending message' : isSuccess ? 'Message sent' : 'Send message'}
      >
        {isSubmitting ? (
          <>
            <Loader2 className='w-4 h-4 mr-2 animate-spin' aria-hidden='true' />
            <span>Sending...</span>
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle className='w-4 h-4 mr-2' aria-hidden='true' />
            <span>Sent!</span>
          </>
        ) : (
          <>
            <Send className='w-4 h-4 mr-2' aria-hidden='true' />
            <span>Send Message</span>
          </>
        )}
      </Button>
    </motion.form>
  );
}
