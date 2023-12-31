'use client';

import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import FormField from './FormField';
import Button from './Button';
import CustomMenu from './CustomMenu';
import { categoryFilters } from '@/constant';
import { updateProject, createNewProject, fetchToken } from '@/lib/actions';
import { FormState, ProjectInterface, SessionInterface } from '@/common.types';

type Props = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};

const ProjectForm = ({ type, session, project }: Props) => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    title: project?.title || '',
    description: project?.description || '',
    image: project?.image || '',
    liveSiteUrl: project?.liveSiteUrl || null,
    githubUrl: project?.githubUrl || null,
    category: project?.category || '',
  });

  const handleStateChange = (fieldName: keyof FormState, value: string) => {
    setForm(prevForm => ({ ...prevForm, [fieldName]: value }));
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes('image')) {
      alert('Please upload an image!');

      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange('image', result);
    };
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === 'create') {
        // @ts-ignore
        await createNewProject(form, session?.user?.id, token);
        router.refresh();
        router.push(`/`);
      }

      if (type === 'edit') {
        // @ts-ignore
        await updateProject(form, project?.id as string, token);
        router.refresh();
        router.push('/');
      }
    } catch (error) {
      alert(`Failed to ${type === 'create' ? 'create' : 'edit'} a project. Try again!`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && 'Choose a poster for your project'}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === 'create' ? true : false}
          className="form_image-input"
          onChange={e => handleChangeImage(e)}
        />
        {form.image && (
          <Image src={form?.image} className="z-20 object-contain sm:p-10" alt="image" fill />
        )}
      </div>

      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={value => handleStateChange('title', value)}
      />

      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects."
        isTextArea
        setState={value => handleStateChange('description', value)}
      />

      <FormField
        type="url"
        title="Website URL"
        // @ts-ignore
        state={form.liveSiteUrl}
        placeholder="https:///${your_url}"
        setState={value => handleStateChange('liveSiteUrl', value)}
      />

      <FormField
        type="url"
        title="GitHub URL"
        // @ts-ignore
        state={form.githubUrl}
        placeholder="https://github.com/${your_login}"
        setState={value => handleStateChange('githubUrl', value)}
      />

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={value => handleStateChange('category', value)}
      />

      <div className="w-full flexStart">
        <Button
          title={
            submitting
              ? `${type === 'create' ? 'Creating' : 'Editing'}`
              : `${type === 'create' ? 'Create' : 'Edit'}`
          }
          type="submit"
          leftIcon={submitting ? '' : '/plus.svg'}
          submitting={submitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
