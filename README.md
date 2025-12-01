# <div align="center"><img src="https://img.shields.io/badge/-🎬_CineMind_-000?style=for-the-badge"/>  
### <sub>Cinema encontra Psicologia. Entenda-se através dos filmes.</sub>
</div>

<div align="center">

<img src="perfil.jpeg" alt="CineMind Dashboard" width="100%" style="border-radius: 12px; box-shadow: 0px 10px 25px rgba(0,0,0,0.5); margin-bottom: 20px;"/>

</div>

---

# 🌌 Sobre o Projeto

> **“Não é apenas sobre o que você assiste.  
> É sobre como você se sente.”**

O **CineMind** é uma plataforma inovadora que combina **Psicologia**, **IA Generativa** e **Cinema** para criar recomendações cinematográficas verdadeiramente pessoais.

Ao invés de sugestões genéricas, o CineMind utiliza seu perfil psicológico (**Big Five**) e humor atual para encontrar **filmes que ressoam emocionalmente com você**.

---

# 📌 Navegação Rápida

<div align="center">

<a href="#funcionalidades">
<img src="https://img.shields.io/badge/Funcionalidades-Explorar-000000?style=for-the-badge&logo=clapperboard" />
</a>
&nbsp;
<a href="#tecnologias">
<img src="https://img.shields.io/badge/Tecnologias-Stack-0A84FF?style=for-the-badge&logo=layers" />
</a>
&nbsp;
<a href="#arquitetura">
<img src="https://img.shields.io/badge/Arquitetura-Visão-1E1E1E?style=for-the-badge&logo=diagramproject" />
</a>
&nbsp;
<a href="#equipe">
<img src="https://img.shields.io/badge/Equipe-CineMind-007ACC?style=for-the-badge&logo=people" />
</a>

</div>

---

# 🧠 A Essência

<div align="center">
  <img src="home.jpeg" alt="Mapa Mental de Emoções" width="70%" style="border-radius:12px;">
</div>

O CineMind redefine recomendação de filmes ao transformar **traços de personalidade**, **preferências de gênero** e **estados emocionais** em **recomendações sensíveis ao contexto**.  
Cada sugestão é guiada por nuances psicológicas — não só pelo histórico do que você assistiu.

---

# ✨ Funcionalidades

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🎯 Impressão Digital Psicológica</h3>
      <p>Durante o onboarding, você responde a um questionário baseado no <strong>Big Five</strong> (OCEAN), permitindo que a plataforma modele seu perfil psicológico com precisão.</p>
    </td>
    <td width="50%" valign="top">
       <img src="forms.jpeg" alt="Quiz de Personalidade" style="border-radius: 10px;">
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <img src="generos.jpeg" alt="Seleção de Gêneros" style="border-radius: 10px;">
    </td>
    <td width="50%" valign="top">
      <h3>🎨 Afinidade de Estilo</h3>
      <p>A plataforma cruza seu perfil psicológico com seus gêneros favoritos, producendo recomendações sob medida para seu gosto — de Sci-fi ao Documentário.</p>
    </td>
  </tr>
</table>

---

# 🌡️ Sistema de Humor (Mood-Based Sorting)

O CineMind interpreta emoções e organiza as sugestões em:

- **🟡 Alegria**
- **🔵 Tristeza**
- **🔴 Tensão**
- **🟢 Curiosidade**
- **🟣 Relaxamento**

Cada filme é ponderado pela IA com base na experiência emocional que proporciona.

---

# 🛠️ Tecnologias  
<div id="tecnologias"></div>

<div align="center">

| Área | Tecnologia |
|------|------------|
| **Frontend** | React, Hooks, Context API, Axios |
| **Backend**  | Django REST Framework, Django ORM |
| **IA** | Google Gemini AI (modelos generativos + embeddings) |
| **Infra & Segurança** | JWT Auth, Docker, Swagger UI, ReDoc |
| **Banco de Dados** | PostgreSQL |

</div>

---

# 🏛️ Arquitetura  
<div id="arquitetura"></div>

<div align="center">

```mermaid
flowchart LR
    A[Usuário] --> B[Frontend React]
    B --> C[API Django REST]
    C --> D[(PostgreSQL)]
    C --> E[Integração com Gemini AI]
    E --> F[(Processamento Semântico)]