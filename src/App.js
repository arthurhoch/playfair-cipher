import React, { Component } from 'react';
import './App.css';


import { Input, Row, Col, Card, Layout, Menu, Icon, Switch } from 'antd';


const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {
    resetGrade: [
      ['A', 'F', 'K', 'P', 'U'],
      ['B', 'G', 'L', 'Q', 'V'],
      ['C', 'H', 'M', 'R', 'X'],
      ['D', 'I', 'N', 'S', 'Y'],
      ['E', 'J', 'O', 'T', 'Z']
    ],
    grade: [
      ['A', 'F', 'K', 'P', 'U'],
      ['B', 'G', 'L', 'Q', 'V'],
      ['C', 'H', 'M', 'R', 'X'],
      ['D', 'I', 'N', 'S', 'Y'],
      ['E', 'J', 'O', 'T', 'Z']
    ],
    mensagem: '',
    mensagemD: '',
    palavra: '',
    resultado: '',
    resultadoD: '',
    showGrade: true
  }

  gridStyle = {
    padding: '15px'

  };

  toggleGradeHandler = () => {
    this.setState({
      showGrade: !this.state.showGrade
    });
  }

  mensagemHandler = (e) => {
    const resultado = this.gerarResultado(e.target.value.toUpperCase());
    this.setState({
      mensagem: e.target.value.toUpperCase(),
      resultado: resultado,
    })
  }

  mensagemDHandler = (e) => {
    console.log('a  ');
    const resultadoD = this.gerarResultadoD(e.target.value.toUpperCase());
    this.setState({
      mensagemD: e.target.value.toUpperCase(),
      resultadoD: resultadoD
    })
  }

  palavraHandler = (e) => {
    const palavra = e.target.value.toUpperCase();
    if (palavra.length > this.state.palavra.length) {
      if (this.state.palavra.includes(palavra[palavra.length - 1]) && palavra.length > 1) {
        return;
      }
      if (!/^[A-Z]+$/.test(palavra)) {
        return;
      }
    }

    let matriz = this.state.grade;
    if (palavra.length === 0) {
      const resetGrade = this.state.resetGrade;
      this.setState({
        palavra: palavra,
        grade: resetGrade
      })
    } else {
      let count = -1;
      let trocadas = '';
      for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
          if (palavra[++count]) {
            trocadas += matriz[j][i];
            matriz[j][i] = palavra[count];
          }
        }
      }
      count = 0;

      for (let index = 0; index < trocadas.length; index++) {
        const letraTrocada = trocadas[index];
        const letra = palavra[index];
        let achou = true;
        for (let i = matriz.length - 1; i >= 0; i--) {
          for (let j = matriz[i].length - 1; j >= 0; j--) {
            if (matriz[j][i] === letra && achou) {
              achou = !achou;
              matriz[j][i] = letraTrocada;
            }
          }
        }
      }

      this.setState({
        palavra: palavra,
        grade: matriz
      })
      this.updateStrins();
    }
  }

  updateStrins = () => {
    const mensagem = this.state.mensagem;
    const mensagemD = this.state.mensagemD;
    if (mensagem.length > 0) {
      const resultado = this.gerarResultado(mensagem);
      this.setState({
        resultado: resultado,
      })
    }
    if (mensagemD.length > 0) {
      const resultadoD = this.gerarResultadoD(mensagemD);
      this.setState({
        resultadoD: resultadoD,
      })
    }

  }

  palavraSplit = (palavra) => {
    var resultado = [];
    for (let index = 0; index < palavra.length; index += 2) {
      resultado.push([palavra[index], palavra[index + 1]]);
    }

    return resultado;
  }


  procuraMesmaLinhaD = (l1, l2) => {
    if (!l1 || !l2) {
      return undefined;
    }
    const matriz = this.state.grade;
    var resultado = undefined;

    for (let i = 0; i < matriz.length; i++) {
      for (let j = 0; j < matriz[i].length; j++) {
        var m1 = matriz[i][j];
        var m2 = matriz[i][j + 1] === undefined ? matriz[i][0] : matriz[i][j + 1];
        if (m1 === l1 && m2 === l2) {

          resultado = matriz[i][j - 1] === undefined ? matriz[i][matriz[i].length - 1] : matriz[i][j - 1];
          resultado += m1;
          return resultado;
        }
      }
    }
    return resultado;
  }

  procuraMesmaColunaD = (l1, l2) => {
    if (!l1 || !l2) {
      return undefined;
    }
    const matriz = this.state.grade;
    var resultado = undefined;

    for (let i = 0; i < matriz.length; i++) {
      for (let j = 0; j < matriz[i].length; j++) {
        var m1 = matriz[j][i];
        var m2 = matriz[j + 1] === undefined ? matriz[0][i] : matriz[j + 1][i];
        if (m1 === l1 && m2 === l2) {
          resultado = matriz[j - 1] === undefined ? matriz[matriz[i].length - 1][i] : matriz[j - 1][i];
          resultado += m1;
          return resultado;
        }
      }
    }
    return resultado;
  }

  procuraMesmaLinha = (l1, l2) => {
    if (!l1 || !l2) {
      return undefined;
    }
    const matriz = this.state.grade;
    var resultado = undefined;

    for (let i = 0; i < matriz.length; i++) {
      for (let j = 0; j < matriz[i].length; j++) {
        var m1 = matriz[i][j];
        var m2 = matriz[i][j + 1] === undefined ? matriz[i][0] : matriz[i][j + 1];
        if (m1 === l1 && m2 === l2) {
          resultado = matriz[i][j + 1];
          if (j + 2 > matriz[i].length) {
            if (resultado) {
              resultado += matriz[i][0];
            } else {
              resultado = matriz[i][0];
              resultado += matriz[i][1];
            }

          } else {
            resultado += matriz[i][j + 2] === undefined ? matriz[i][0] : matriz[i][j + 2];
          }
          return resultado;
        }
      }
    }
    return resultado;
  }

  procuraMesmaColuna = (l1, l2) => {
    if (!l1 || !l2) {
      return undefined;
    }
    const matriz = this.state.grade;
    var resultado = undefined;

    for (let i = 0; i < matriz.length; i++) {
      for (let j = 0; j < matriz[i].length; j++) {
        var m1 = matriz[j][i];
        var m2 = matriz[j + 1] === undefined ? matriz[0][i] : matriz[j + 1][i];
        if (m1 === l1 && m2 === l2) {
          resultado = matriz[j + 1] === undefined ? matriz[0][i] : matriz[j + 1][i];
          if (j + 2 > matriz[j].length) {
            if (!matriz[j + 1]) {
              resultado += matriz[1][i];
            } else {
              resultado += matriz[0][i];
            }
          } else {
            resultado += matriz[j + 2] === undefined ? matriz[0][i] : matriz[j + 2][i];
          }
          return resultado;
        }
      }
    }
    return resultado;
  }

  procuraQuadrante = (l1, l2) => {
    if (!l1 || !l2) {
      return undefined;
    }
    const matriz = this.state.grade;
    var r1, r2, locax1, locax2, locay1, locay2;

    for (let i = 0; i < matriz.length; i++) {
      for (let j = 0; j < matriz[i].length; j++) {
        var m = matriz[j][i];
        if (m === l1) {
          locax1 = j;
          locay1 = i;
        } else if (m === l2) {
          locax2 = j;
          locay2 = i;
        }
      }
    }
    r1 = matriz[locax1] === undefined ? undefined : matriz[locax1][locay2];
    r2 = matriz[locax2] === undefined ? undefined : matriz[locax2][locay1];

    if (!r1 || !r2) {
      return undefined;
    }

    return r1 + r2;
  }

  processaDupla = (dupla) => {
    var resultado = this.procuraMesmaLinha(dupla[0], dupla[1]);
    if (!resultado) {
      resultado = this.procuraMesmaColuna(dupla[0], dupla[1]);
      if (!resultado) {
        resultado = this.procuraQuadrante(dupla[0], dupla[1]);
      }
    }
    return resultado;
  }

  processaDuplaD = (dupla) => {
    var resultado = this.procuraMesmaLinhaD(dupla[0], dupla[1]);
    if (!resultado) {
      resultado = this.procuraMesmaColunaD(dupla[0], dupla[1]);
      if (!resultado) {
        resultado = this.procuraQuadrante(dupla[0], dupla[1]);
      }
    }
    return resultado;
  }

  gerarResultadoD = (palavra) => {
    var resultado = '';
    const duplas = this.palavraSplit(palavra);
    for (let index = 0; index < duplas.length; index++) {
      let tmp = this.processaDuplaD(duplas[index]);
      if (tmp) {
        resultado += tmp;
      }
    }

    return resultado;
  }

  gerarResultado = (palavra) => {
    var resultado = '';
    const duplas = this.palavraSplit(palavra);
    for (let index = 0; index < duplas.length; index++) {
      let tmp = this.processaDupla(duplas[index]);
      if (tmp) {
        resultado += tmp;
      }
    }

    return resultado;
  }

  render() {
    return (
      <Layout>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Playfair cipher</Menu.Item>
            <Menu.Item key="2">
              <a href="https://github.com/arthurhoch/playfair-cipher">
                <Icon style={{ fontSize: 30 }} type="github" spin={true} /> Github
              </a>
            </Menu.Item>

          </Menu>
        </Header>
        <Content style={{ margin: '5px 16px 0', overflow: 'initial' }}>
          <Row type="flex" justify="center" align="top" >
            <Col span={24}>
              <Card title="Entrada" style={{ margin: '5px', overflow: 'initial' }} >
                <Row type="flex" justify="center" align="top" >
                  <Col span={20}>
                    <label>Encriptar:</label><br />
                    <Input type="text" onChange={this.mensagemHandler} value={this.state.mensagem} />
                    <br />
                  </Col>
                </Row>
                <Row type="flex" justify="center" align="top" >
                  <Col span={20}>
                    <label>Desencriptar:</label><br />
                    <Input type="text" onChange={this.mensagemDHandler} value={this.state.mensagemD} />
                    <br />
                  </Col>
                </Row>
                <Row type="flex" justify="center" align="top">
                  <Col span={20}>
                    <label>Palavra:</label><br />
                    <Input type="text" onChange={this.palavraHandler} value={this.state.palavra} />
                    <br />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row type="flex" justify="center" align="top">
            <Col span={24}>
              <Card title="Encriptado" style={{ margin: '5px', overflow: 'initial' }}>
                <p>{this.state.resultado}</p>
              </Card>
            </Col>
          </Row>
          <Row type="flex" justify="center" align="top">
            <Col span={24}>
              <Card title="Desencriptado" style={{ margin: '5px', overflow: 'initial' }}>
                <p>{this.state.resultadoD}</p>
              </Card>
            </Col>
          </Row>
          <Row type="flex" justify="center" align="top">
            <Col span={24}>
              <Card title="Matriz"
                extra={<Switch defaultChecked onChange={this.toggleGradeHandler} />}>
                {this.state.showGrade && <Row type="flex" justify="center" align="top">
                  {
                    this.state.grade.map((linha, index) =>
                      <div key={index}>
                        {linha.map((letra, indexLetra) =>
                          <Col key={indexLetra + 1 * 7}>
                            <Card className="cardLetter" color="#108ee9">
                              <span >{letra}</span>
                            </Card >
                          </Col>
                        )
                        }
                      </div>
                    )
                  }
                </Row>}
              </Card>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Arthur Jahnke Hoch ©2018
        </Footer>
      </Layout>
    );
  }
}

export default App;
