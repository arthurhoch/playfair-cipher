import React, { Component } from 'react';
import './App.css';


import { Input, Row, Col, Card, Layout, Menu, Icon, Switch } from 'antd';


const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {
    resetGrade: [
      ['A', 'B', 'C', 'D', 'E'],
      ['F', 'G', 'H', 'I', 'J'],
      ['K', 'L', 'M', 'N', 'O'],
      ['P', 'Q', 'R', 'S', 'T'],
      ['U', 'v', 'X', 'Y', 'Z']
    ],
    grade: [
      ['A', 'B', 'C', 'D', 'E'],
      ['F', 'G', 'H', 'I', 'J'],
      ['K', 'L', 'M', 'N', 'O'],
      ['P', 'Q', 'R', 'S', 'T'],
      ['U', 'v', 'X', 'Y', 'Z']
    ],
    mensagem: '',
    palavra: '',
    resultado: '',
    showGrade: true
  }

  toggleGradeHandler = () => {
    this.setState({
      showGrade: !this.state.showGrade
    });
  }

  mensagemHandler = (e) => {
    this.setState({
      mensagem: e.target.value.toUpperCase(),
      resultado: this.gerarResultado(e.target.value.toUpperCase())
    })
  }

  palavraHandler = (e) => {
    const palavra = e.target.value.toUpperCase();
    let matriz = this.state.grade;
    if (palavra.length === 0) {
      const resetGrade = this.state.resetGrade;
      this.setState({
        palavra: palavra,
        grade: resetGrade
      })
    } else {
      let count = -1;
      for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
          if (palavra[++count]) {
            matriz[j][i] = palavra[count];
          }
        }
      }

      this.setState({
        palavra: palavra,
        grade: matriz
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
                    <label>Mensagem:</label><br />
                    <Input type="text" onChange={this.mensagemHandler} value={this.state.mensagem} />
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
              <Card title="Matriz" style={{ margin: '5px', overflow: 'initial' }}
                extra={<Switch defaultChecked onChange={this.toggleGradeHandler} />}>
                {this.state.showGrade && <Row type="flex" justify="center" align="top">
                  {
                    this.state.grade.map((linha, index) =>
                      <span key={index}>
                        {
                          linha.map((letra, indexLetra) =>
                            <Col key={indexLetra + 1 * 7}>
                              {/* <Input type="text" onChange={this.letraHandler} value={letra}/> */}
                              <Card color="#108ee9">
                                <span className="letter">{letra}</span>
                              </Card >
                            </Col>
                          )
                        }
                        <br />
                      </span>
                    )
                  }
                </Row>}
              </Card>
            </Col>
          </Row>
          <Row type="flex" justify="center" align="top">
            <Col span={24}>
              <Card title="Resultado" style={{ margin: '5px', overflow: 'initial' }}>
                <p>{this.state.resultado}</p>
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
