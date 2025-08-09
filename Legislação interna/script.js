document.addEventListener('DOMContentLoaded', () => { 

    // Objeto com as respostas corretas para cada questão. 

    const respostasCorretas = { 

        q1: 'A', 

        q2: 'C', 

        q3: 'E', 

        q4: 'D', 

        q5: 'B', 

        q6: 'E', 

        q7: 'A', 

        q8: 'C', 

        q9: 'E', 

        q10: 'A', 

        q11: 'D', 

        q12: 'D', 

        q13: 'C', 

        q14: 'B', 

        q15: 'C', 

        q16: 'D', 

        q17: 'A', 

        q18: 'D', 

        q19: 'C', 

        q20: 'B', 

        q21: 'A', 

        q22: 'B', 

        q23: 'D', 

        q24: 'C', 

        q25: 'B', 

        q26: 'E', 

        q27: 'D', 

        q28: 'A', 

    }; 

  

    const totalQuestoes = Object.keys(respostasCorretas).length; 

    let pontuacao = 0; 

    const form = document.getElementById('quizForm'); 

    const questions = document.querySelectorAll('.question'); 

    const submitBtn = document.getElementById('submitBtn'); 

  

    // Adiciona div para o resultado final, escondida inicialmente. 

    const resultFinalDiv = document.createElement('div'); 

    resultFinalDiv.id = 'result-final'; 

    resultFinalDiv.style.display = 'none'; 

    form.appendChild(resultFinalDiv); 

  

    // Adiciona o botão de verificar e reiniciar, para o final do formulário 

    const buttonContainer = document.createElement('div'); 

    buttonContainer.classList.add('button-container'); 

  

    const submitButton = document.createElement('button'); 

    submitButton.id = 'submit-button'; 

    submitButton.textContent = 'Verificar Respostas'; 

    buttonContainer.appendChild(submitButton); 

  

    const resetButton = document.createElement('button'); 

    resetButton.id = 'reset-button'; 

    resetButton.textContent = 'Reiniciar Simulador'; 

    resetButton.style.display = 'none'; 

    buttonContainer.appendChild(resetButton); 

  

    form.appendChild(buttonContainer); 

  

    questions.forEach(question => { 

        const questionName = question.id; 

        const options = question.querySelectorAll('.option'); 

        const resultDiv = document.getElementById(`result-${questionName}`); 

  

        options.forEach(option => { 

            option.addEventListener('click', () => { 

                // Remove as classes de feedback de todas as opções da pergunta 

                options.forEach(opt => { 

                    opt.classList.remove('correct-option', 'incorrect-option'); 

                }); 

  

                // Aplica a classe de feedback na opção clicada 

                const selectedInput = option.querySelector('input[type="radio"]'); 

                const respostaUsuario = selectedInput.value; 

                const respostaCorreta = respostasCorretas[questionName]; 

  

                if (respostaUsuario === respostaCorreta) { 

                    resultDiv.classList.add('correct'); 

                    resultDiv.textContent = 'Resposta correta!'; 

                    resultDiv.classList.remove('incorrect'); 

                    option.classList.add('correct-option'); 

                } else { 

                    resultDiv.classList.add('incorrect'); 

                    resultDiv.textContent = `Resposta incorreta. A resposta correta é a alternativa ${respostaCorreta}.`; 

                    resultDiv.classList.remove('correct'); 

                    option.classList.add('incorrect-option'); 

                } 

                resultDiv.style.display = 'block'; 

            }); 

        }); 

    }); 

  

    submitButton.addEventListener('click', (e) => { 

        e.preventDefault(); 

        pontuacao = 0; // Reseta a pontuação para recalcular 

        questions.forEach(question => { 

            const questionName = question.id; 

            const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`); 

  

            if (selectedOption) { 

                const respostaUsuario = selectedOption.value; 

                const respostaCorreta = respostasCorretas[questionName]; 

  

                if (respostaUsuario === respostaCorreta) { 

                    pontuacao++; 

                } 

            } 

        }); 

  

        // Mostra o resultado final e os botões 

        resultFinalDiv.textContent = `Sua pontuação: ${pontuacao}/${totalQuestoes}`; 

        resultFinalDiv.style.display = 'block'; 

        resetButton.style.display = 'inline-block'; 

        submitButton.style.display = 'none'; 

  

        // Exibe o feedback de todas as questões após o clique no botão 

        questions.forEach(question => { 

            const questionName = question.id; 

            const options = question.querySelectorAll('.option'); 

            const resultDiv = document.getElementById(`result-${questionName}`); 

            const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`); 

  

            options.forEach(opt => { 

                opt.classList.remove('correct-option', 'incorrect-option'); 

                opt.style.pointerEvents = 'none'; // Desabilita as opções após a verificação 

            }); 

  

            if (selectedOption) { 

                const respostaUsuario = selectedOption.value; 

                const respostaCorreta = respostasCorretas[questionName]; 

  

                if (respostaUsuario === respostaCorreta) { 

                    options.forEach(opt => { 

                        if (opt.querySelector('input').value === respostaCorreta) { 

                            opt.classList.add('correct-option'); 

                        } 

                    }); 

                } else { 

                    options.forEach(opt => { 

                        if (opt.querySelector('input').value === respostaCorreta) { 

                            opt.classList.add('correct-option'); 

                        } 

                        if (opt.querySelector('input').value === respostaUsuario) { 

                            opt.classList.add('incorrect-option'); 

                        } 

                    }); 

                } 

            } else { 

                // Caso a questão não tenha sido respondida, exibe a correta. 

                options.forEach(opt => { 

                    if (opt.querySelector('input').value === respostasCorretas[questionName]) { 

                        opt.classList.add('correct-option'); 

                    } 

                }); 

            } 

  

            resultDiv.style.display = 'block'; 

            resultDiv.classList.add('correct'); 

            resultDiv.textContent = `A resposta correta é a alternativa ${respostasCorretas[questionName]}.`; 

        }); 

    }); 

  

    // Função para reiniciar o simulado 

    resetButton.addEventListener('click', () => { 

        pontuacao = 0; 

        resultFinalDiv.style.display = 'none'; 

        resetButton.style.display = 'none'; 

        submitButton.style.display = 'block'; 

  

        questions.forEach(question => { 

            const questionName = question.id; 

            const options = question.querySelectorAll('.option'); 

            const resultDiv = document.getElementById(`result-${questionName}`); 

  

            // Desmarca o radio button 

            const selectedInput = question.querySelector('input[type="radio"]:checked'); 

            if (selectedInput) { 

                selectedInput.checked = false; 

            } 

  

            // Remove as classes de feedback e reativa os cliques 

            options.forEach(opt => { 

                opt.classList.remove('correct-option', 'incorrect-option'); 

                opt.style.pointerEvents = 'auto'; // Reativa os cliques 

            }); 

  

            // Limpa o texto de feedback 

            resultDiv.classList.remove('correct', 'incorrect'); 

            resultDiv.textContent = ''; 

            resultDiv.style.display = 'none'; 

        }); 

    }); 

}); 