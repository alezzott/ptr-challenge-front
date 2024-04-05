import { useRouter } from "next/router";
import Header from "../../components/Header";
import { ButtonRegister, ContentRegister, TitleRegister } from "./syles";
import { FormControl, MenuItem, Select, TextField, Button } from "@material-ui/core";
import { useCallback, useState } from "react";
import axios from "axios";
import { api } from "../../config/api";


interface CepData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export default function Register() {
  const router = useRouter();

  const [cepData, setCepData] = useState<CepData | null>(null);

  const STATUS = {
    RELEASE: 'Lançamento',
    SOON: 'Em breve',
    IN_WORKS: 'Em obras',
    READY_TO_LIVE: 'Pronto para morar'
  };

  const PURPOSE = {
    HOME: 'Residencial',
    COMMERCIAL: 'Comercial'
  };

  const [formData, setFormData] = useState<{
    status: string;
    name: string;
    purpose: string;
    address: {
      cep: string;
      number: string;
      district: string;
      city: string;
      street: string;
      state: string;
    }
  }>({
    status: '',
    name: '',
    purpose: '',
    address: {
      cep: '',
      number: '',
      district: '',
      city: '',
      street: '',
      state: '',
    },
  });

  const handleChange = useCallback((e: any) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const [, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }, []);

  const handleSearch = useCallback(async () => {
    if (/^\d{8}$/.test(formData.address.cep)) {
      try {
        const response = await axios.get<CepData>(`https://viacep.com.br/ws/${formData.address.cep}/json/`);
        setCepData(response.data);
        setFormData(prev => ({
          ...prev,
          address: {
            ...prev.address,
            district: response.data.bairro,
            city: response.data.localidade,
            street: response.data.logradouro,
            state: response.data.uf,
          },
        }));
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    } 
  }, [formData.address.cep]);

 const handleSubmit = useCallback(async (event: React.FormEvent) => {
  event.preventDefault();
  if (
    formData.status.trim() === '' ||
    formData.name.trim() === '' ||
    formData.purpose.trim() === '' ||
    formData.address.cep.trim() === '' ||
    formData.address.number.trim() === '' ||
    formData.address.district.trim() === '' ||
    formData.address.city.trim() === '' ||
    formData.address.street.trim() === '' ||
    formData.address.state.trim() === ''
  ) {
    alert('Por favor, preencha todos os campos.');
    return;
  }
  try {
    await api.post('/empreendimentos/create', formData);
    alert("Sucesso !")
    setFormData({
      status: '',
      name: '',
      purpose: '',
      address: {
        cep: '',
        number: '',
        district: '',
        city: '',
        street: '',
        state: '',
      },
    });
    router.push('/');
  } catch (error) {
    console.error('Erro ao criar empreendimento:', error);
  }
}, [formData, router]);


  return (
    <>
      <Header
        title="Cadastro de empreendimento"
        IconReturn={true}
        PushButtonReturn={() => router.push('/')}
      />

    <div style={{ marginTop: '40px'}}>
      <ContentRegister>
        <div>
          <TitleRegister>
            <h1 style={{ fontWeight: 700, fontSize: '18px'  }}>Informações</h1>
          </TitleRegister>

          <form onSubmit={handleSubmit}>
            <FormControl variant="standard" sx={{ width: '100%', borderColor: "#BBB8D9",  marginTop: 5 }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard-type"
                onChange={handleChange}
                name="status"
                label="Status"
                value="RELEASE"
                
                
              >
                <MenuItem value="">Selecione o tipo</MenuItem>
                {Object.entries(STATUS).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>


            <TextField
              id="standard-basic"
              label="Nome do Empreendimento"
              variant="standard"
              sx={{ width: '100%',  marginTop: 4  }}
              onChange={handleChange}
              name="name"
            />

            <FormControl variant="standard" sx={{ width: '100%', marginTop: 5 }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard-purpose"
                onChange={handleChange}
                name="purpose"
                label="Purpose"
                value="HOME"
              >
                <MenuItem value="">Selecione o propósito</MenuItem>
                {Object.entries(PURPOSE).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              id="standard-basic"
              label="CEP"
              variant="standard"
              sx={{ width: '100%',  marginTop: 5  }}
              value={formData.address.cep}
              onChange={handleChange}
              name="address.cep"
            />

           <Button 
  onClick={handleSearch} 
  sx={{ 
    padding: '10px 20px', 
    backgroundColor: "#3b3391", 
    color: "white", 
    marginTop: '10px', 
    borderRadius: '30px', 
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
    transition: 'background-color 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: '#5246b6',
    }
  }} 
>
  Buscar CEP
</Button>


            {cepData && (
              <div style={{ color: '#302E45', fontSize: '14px' }}>
                <p>CEP: {cepData.cep}</p>
                <p>Logradouro: {cepData.logradouro}</p>
                <p>Bairro: {cepData.bairro}</p>
                <p>Cidade: {cepData.localidade}</p>
                <p>Estado: {cepData.uf}</p>
              </div>
            )}

            <TextField
              id="standard-basic"
              label="Número"
              variant="standard"
              sx={{ width: '100%',  marginTop: 5  }}
              value={formData.address.number}
              onChange={handleChange}
              name="address.number"
            />


            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <ButtonRegister type="submit">Cadastrar</ButtonRegister>
            </div>
          </form>
        </div>
      </ContentRegister>

    </div>
    </>
  );
}
